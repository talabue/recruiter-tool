import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route    POST /api/auth/register
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route    POST /api/auth/login
router.post(
    '/login',
    [
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid Credentials' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid Credentials' });
        }
  
        const payload = { user: { id: user.id } };
        console.log('🔍 JWT_SECRET:', process.env.JWT_SECRET);
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        res.json({ token });
      } catch (error) {
        console.error('❌ Login Error:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Ensure THIS export is correct
export default router;
