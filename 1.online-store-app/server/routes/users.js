import express from 'express';
import { register, login } from '../controllers/UserController.js';
import { body, validationResult } from 'express-validator';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorHandler(errors.array(), req, res, next);
        }
        await register(req, res, next);
    }
], register);
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorHandler(errors.array(), req, res, next);
        }
        await login(req, res, next);
    }
], login);

export default router;