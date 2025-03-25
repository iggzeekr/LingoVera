"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
const auth_1 = __importDefault(require("./routes/auth"));
const vocabulary_1 = __importDefault(require("./routes/vocabulary"));
const lessons_1 = __importDefault(require("./routes/lessons"));
const quizzes_1 = __importDefault(require("./routes/quizzes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Supabase client
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/vocabulary', vocabulary_1.default);
app.use('/api/lessons', lessons_1.default);
app.use('/api/quizzes', quizzes_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('Lingovera API is running');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map