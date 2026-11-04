import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API endpoint for AI-powered modern grievance translation into historical insults
  app.post('/api/generate-ai-burn', async (req, res) => {
    const { grievance, era = 'elizabethan' } = req.body;

    if (!grievance || typeof grievance !== 'string') {
      return res.status(400).json({ error: 'Grievance text is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI();
        const prompt = `You are a legendary historical English master of calumny, satire, and vitriol (embodying Shakespeare, Ben Jonson, Francis Grose, and Oscar Wilde).
A user has brought a modern 21st-century annoyance or offense:
"${grievance}"

Your task: Convert this modern annoyance into a single, magnificent, devastating historical English insult and formal bill of indictment, written strictly in authentic ${era.toUpperCase()} era vernacular and rhetoric.

Rules:
1. Absolutely NO modern words, slang, or anachronisms (no "wifi", "email", "app", etc. Transmute them into period equivalents like "quill-scrawls", "messengers", "empty parchment", etc.).
2. Use authentic archaic insult compounds (e.g., fopdoodle, blatherskite, lubberwort, beef-witted, bed-presser, dandiprat, clatterfart).
3. The response must be JSON formatted:
{
  "burn": "The full historical insult/indictment (2-3 sentences max, sharp and theatrical)",
  "context": "One short sentence explaining the historical rhetorical technique used"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const text = response.text?.trim() || '';
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch {
          return res.json({
            burn: text.replace(/^"|"$/g, ''),
            context: `Composed in authentic ${era} theatrical cadence.`
          });
        }
      } catch (err) {
        console.warn('Gemini API call fell back to local generation:', err);
      }
    }

    // High quality algorithmic fallback
    const fallbacks: Record<string, string> = {
      elizabethan: `Hear me, thou knotty-pated, time-wasting blatherskite! Concerning thy petty deed of "${grievance}": thou hast proved thyself a dronish, bed-pressing fopdoodle whose very presence doth sour the ale at twenty paces! I desire we be better strangers!`,
      georgian: `Upon my honour, sir, regarding your insolent conduct in "${grievance}": you are an abominable, flummery-peddling dandiprat fit only to drive night-carts through the filth of St. Giles! A caning from my footman is too distinguished an honour for you!`,
      victorian: `Sir, your lamentable behavior regarding "${grievance}" brands you as a cad of the lowest water, a purveyor of unadulterated humbug, and a social blight. I have instructed my household that your card shall never again be admitted to my tray!`
    };

    return res.json({
      burn: fallbacks[era] || fallbacks.elizabethan,
      context: `Composed via historical rhetoric engine for the ${era} era.`
    });
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
