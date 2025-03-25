import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Placeholder for lessons controller functions
// These will be implemented later
const getLessons = (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get lessons endpoint' });
};

const getLessonById = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  res.json({ message: `Get lesson with id: ${id}` });
};

// Lessons routes
router.get('/', authenticateToken, getLessons);
router.get('/:id', authenticateToken, getLessonById);

export default router; 