import { Application } from 'express';
import Locals from './App';
import apiRouter from './../routes/Api';

class Routes {
  public mountWeb(_express: Application): Application {
    console.log('Routes :: Mounting Web Routes...');

    return _express.use('/', apiRouter);
  }

  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix;
    console.log('Routes :: Mounting API Routes...');

    return _express.use(`/${apiPrefix}`, apiRouter);
  }
}

export default new Routes;