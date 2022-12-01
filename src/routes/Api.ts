import { NextFunction, Request, Response, Router } from 'express';
import App from '../providers/App';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'wow!!!' });
});

export default router;