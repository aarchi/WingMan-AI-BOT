import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// Declare the global SpeechSDK loaded via <script> in index.html
declare const SpeechSDK: any;

@Injectable({ providedIn: 'root' })
export class TextToSpeechService {
  // Azure subscription key and region from environment files
  private readonly AZURE_KEY = environment.ttsApiKey;
  private readonly AZURE_REGION = environment.ttsRegion;

  // SpeechSynthesizer instance
  private synthesizer: any;

  constructor() {
    // Initialize SpeechConfig with subscription and region
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      this.AZURE_KEY,
      this.AZURE_REGION
    );

    // Set voice for synthesis
    speechConfig.speechSynthesisVoiceName = 'en-US-GuyNeural';

    // Create a pull stream for audio output (no direct playback)
    const pullStream  = SpeechSDK.AudioOutputStream.createPullStream();
    const audioConfig = SpeechSDK.AudioConfig.fromStreamOutput(pullStream);

    // Instantiate the SpeechSynthesizer
    this.synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
    );
  }

  /**
   * Synthesizes speech from text and returns a WAV Blob.
   * @param text - The text to synthesize.
   * @returns Promise resolving to audio Blob.
   */
  getAudioBlob(text: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.synthesizer.speakTextAsync(
        text,
        (result: any) => {
          if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            // Wrap raw audio data in a WAV blob
            const audioBlob = new Blob([result.audioData], { type: 'audio/wav' });
            resolve(audioBlob);
          } else {
            reject(result.errorDetails);
          }
        },
        (error: any) => reject(error)
      );
    });
  }
}
