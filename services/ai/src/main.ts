import express from 'express';
import { LLMRouter } from './router/llm-router';

const app = express();
app.use(express.json());

const router = new LLMRouter();

app.post('/api/v1/ai/summarize', async (req, res) => {
  const { prompt, title } = req.body;
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Prompt is required' });
  }

  const result = await router.routeNoteSummary(prompt, title);
  return res.json({ success: true, data: result.data, cached: result.cached });
});

app.post('/api/v1/ai/flashcards', async (req, res) => {
  const { topic, cardCount } = req.body;
  const count = parseInt(cardCount, 10) || 5;

  const result = await router.routeFlashcards(topic || 'General Science', count);
  return res.json({ success: true, data: result.data, cached: result.cached });
});

app.post('/api/v1/ai/quiz', async (req, res) => {
  const { topic, questionCount } = req.body;
  const count = parseInt(questionCount, 10) || 5;

  const result = await router.routeQuiz(topic || 'Core Curriculum', count);
  return res.json({ success: true, data: result.data, cached: result.cached });
});

app.get('/api/v1/ai/cache-stats', (req, res) => {
  return res.json({ success: true, data: router.getCacheStats() });
});

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`🤖 AI Gateway Service running on port ${port}`);
});

