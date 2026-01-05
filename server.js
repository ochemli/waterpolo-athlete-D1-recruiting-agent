import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// Import the coach handler
import coachHandler from './api/coach.js';

app.post('/api/coach', async (req, res) => {
  await coachHandler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`✅ Ready to handle requests at http://localhost:${PORT}/api/coach`);
});

