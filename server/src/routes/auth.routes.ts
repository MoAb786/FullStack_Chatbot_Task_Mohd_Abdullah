import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { loginSchema } from '../schemas/auth.schema';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', validate(loginSchema, 'body'), login);
router.get('/me', authenticateAdmin, getMe);

export default router;
