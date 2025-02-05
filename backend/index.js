import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';  
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import path from 'path';



dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes); 
app.use('/api/candidates', candidateRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); // Serve uploaded files statically

app.get('/api/test', (req, res) => {
  res.json({ message: 'MongoDB is working!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
