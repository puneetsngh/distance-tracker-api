import { NextFunction, Request, Response, Router } from 'express';
import Logger from '../middlewares/logger';
import App from '../providers/App';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger(req, 'server');
  logger.info('hello world', { msg: 'success' });
  res.send({ message: 'wow!!!' });
});

export default router;