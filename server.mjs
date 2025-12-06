// server.mjs - HTTP Server with API Proxy (Node.js compatible)
import { createServer } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/groq', async (req, res) => {
  try {
    const { systemPrompt, userMessage } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: { message: 'GEMINI_API_KEY not configured on server' }
      });
    }
    res.end();
    return;
  }

  // API Proxy for Groq
  if (req.url === '/api/groq' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { apiKey, systemPrompt, userMessage } = JSON.parse(body);
        const data = await callGroqAPI(apiKey, systemPrompt, userMessage);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error('API Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: error.message } }));
      }
    });
    return;
  }

  // Static file serving
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = join(__dirname, filePath);

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(500);
    res.end('Server Error');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('🛡️ DARK EMPATHY SHIELD Server running at http://localhost:8000');
  console.log('📡 API Proxy enabled for Groq');
});
