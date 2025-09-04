import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { z } from 'zod';

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

const router = Router();

const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});
router.post('/register', async (req, res) => {
  try {
    const data = userSchema.parse(req.body);
    return authController.register(req, res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    return authController.login(req, res);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/me', authMiddleware, authController.me);

export { router as authRoutes };
