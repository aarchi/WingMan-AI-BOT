from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PyPDF2 import PdfReader
import docx2txt
import io
import os
import requests

app = Flask(__name__)
CORS(app)  # Allow CORS

# --- Document extraction endpoint (unchanged) ---
@app.route('/extract_text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    f = request.files['file']
    text = ''

    if f.filename.lower().endswith('.pdf'):
        reader = PdfReader(f)
        for p in reader.pages:
            text += p.extract_text() or ''
    elif f.filename.lower().endswith(('.docx', '.doc')):
        text = docx2txt.process(f)
    else:
        return jsonify({'error': 'Unsupported format'}), 400

    return jsonify({'text': text}), 200


# --- Improved TTS endpoint ---
@app.route('/tts', methods=['POST'])
def tts():
    data = request.get_json(silent=True)
    text = (data or {}).get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    AZURE_KEY    = os.getenv('AZURE_KEY', 'xxxxxxxxxxxxxx')
    AZURE_REGION = os.getenv('AZURE_REGION', 'centralindia')

    # 1) Fetch auth token
    token_url = f"https://{AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken"
    token_resp = requests.post(
        token_url,
        headers={'Ocp-Apim-Subscription-Key': AZURE_KEY}
    )
    if token_resp.status_code != 200:
        app.logger.error(f"TTS token fetch failed: {token_resp.status_code} {token_resp.text}")
        return jsonify({'error': 'Failed to fetch TTS token'}), 500
    token = token_resp.text

    # 2) Call the TTS service with SSML
    tts_url = f"https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
    ssml = f"""
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' xml:gender='Male' name='en-US-GuyNeural'>
          {text}
        </voice>
      </speak>
    """
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3'
    }
    resp = requests.post(tts_url, headers=headers, data=ssml.encode('utf-8'))
    if resp.status_code == 200:
        # Stream the MP3 directly
        return send_file(
            io.BytesIO(resp.content),
            mimetype='audio/mpeg',
            as_attachment=False,
            download_name='speech.mp3'
        )
    else:
        app.logger.error(f"TTS synthesis failed: {resp.status_code} {resp.text}")
        return jsonify({'error': f"TTS failed ({resp.status_code})"}), 500

if __name__ == '__main__':
    # Make sure AZURE_KEY and AZURE_REGION are set in your environment
    app.run(host='0.0.0.0', port=5001)
