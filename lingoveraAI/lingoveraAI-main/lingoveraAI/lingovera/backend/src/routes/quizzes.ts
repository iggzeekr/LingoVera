import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Placeholder for quizzes controller functions
// These will be implemented later
const getQuizzes = (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get quizzes endpoint' });
};

const getQuizById = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  res.json({ message: `Get quiz with id: ${id}` });
};

// Quizzes routes
router.get('/', authenticateToken, getQuizzes);
router.get('/:id', authenticateToken, getQuizById);

export default router; 