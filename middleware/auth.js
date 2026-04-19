import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';
import { JWT_SECRET } from '../config.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeBookOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only modify books you created' });
    }

    req.book = book; // Attach book to request for use in routes
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(500).json({ message: 'Server error during authorization' });
  }
};