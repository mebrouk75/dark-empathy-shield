import { request as httpsRequest } from 'node:https';

function callGeminiAPI(apiKey, systemPrompt, userMessage) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      contents: [{
        parts: [{ text: userMessage }]
      }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = httpsRequest(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Convert Gemini response to OpenAI-like format
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          resolve({
            choices: [{
              message: {
                content: text
              }
            }]
          });
        } catch (e) {
          reject(new Error('Invalid JSON response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { systemPrompt, userMessage } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        res.status(500).json({ error: { message: 'GEMINI_API_KEY not configured' } });
        return;
      }

      const data = await callGeminiAPI(apiKey, systemPrompt, userMessage);
      res.status(200).json(data);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
