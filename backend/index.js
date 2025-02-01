import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';  // ✅ Ensure "./db.js" includes ".js"

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'MongoDB is working!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
