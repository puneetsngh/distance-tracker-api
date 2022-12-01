import { NextFunction, Request, Response } from 'express';
import App from '../providers/App';

class Handler {

  public static notFoundHandler(_express: any): any {

    _express.use('*', (req: Request, res: Response) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      console.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
      return res.json({
        error: 'Page Not Found'
      });
    });

    return _express;
  }

  /**
   * Handles your apiroute s errors/exception
   */
  public static clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);

    if (req.xhr) {
      return res.status(500).send({ error: 'Something went wrong!' });
    } else {
      return next(err);
    }
  }

  public static errorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);
    res.status(500);

    if (err.name && err.name === 'UnauthorizedError') {
      const message = err && err.message ? err.message : undefined;
      return res.json({
        error: [
          'Invalid Token!',
          message
        ]
      });
    }
    return res.json({
      error: err
    });
  }


  public static logErrors(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);

    return next(err);
  }
}

export default Handler;