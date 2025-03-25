"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Placeholder for quizzes controller functions
// These will be implemented later
const getQuizzes = (req, res) => {
    res.json({ message: 'Get quizzes endpoint' });
};
const getQuizById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get quiz with id: ${id}` });
};
// Quizzes routes
router.get('/', auth_1.authenticateToken, getQuizzes);
router.get('/:id', auth_1.authenticateToken, getQuizById);
exports.default = router;
//# sourceMappingURL=quizzes.js.map