"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Placeholder for lessons controller functions
// These will be implemented later
const getLessons = (req, res) => {
    res.json({ message: 'Get lessons endpoint' });
};
const getLessonById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get lesson with id: ${id}` });
};
// Lessons routes
router.get('/', auth_1.authenticateToken, getLessons);
router.get('/:id', auth_1.authenticateToken, getLessonById);
exports.default = router;
//# sourceMappingURL=lessons.js.map