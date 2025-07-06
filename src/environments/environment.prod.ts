export const environment = {
  production: true,

  // Your Python parsing server
  fileParserUrl: 'http://localhost:5001',

  // Your GPT endpoint — we’ll proxy this through your own backend later
  gptUrl: 'https://api.openai.com/v1/chat/completions',

  // (Optional) If you really must call OpenAI directly in dev:
  gptApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

  // Your STT endpoint
  ttsUrl: 'http://localhost:5001/tts',

  // (Optional) Same caveat as above:
  ttsApiKey: 'xxxxxxxxxxxxxxxxxxxx',
  ttsRegion: 'centralindia',
};
