import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
