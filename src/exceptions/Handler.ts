import { NextFunction, Request, Response } from 'express';
import App from '../providers/App';

class Handler {

  public static notFoundHandler(_express: any): any {

    _express.use('*', (req: Request, res: Response) => {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      req.log.error(`Path '${req.originalUrl}' not found [IP: '${clientIp}']!`);
      return res.status(404).json({
        error: 'Page Not Found',
      });
    });

    return _express;
  }

  /**
   * Handles your apiroute s errors/exception
   */
  public static clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    req.log.error(err.stack, 'client error');
    if (req.xhr) {
      return res.status(500).send({ error: 'Something went wrong!' });
    } else {
      return next(err);
    }
  }

  public static errorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    req.log.error(err.stack, 'some error occurred');
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
    req.log.error(err.stack, 'error occurred');
    return next(err);
  }
}

export default Handler;