import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/products/products.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  const status = 200;
  res.status(status).send('Welcome to Gift Mate Server!');
});

export default app;
