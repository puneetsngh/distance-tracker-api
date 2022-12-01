import { NextFunction, Request, Response } from 'express';
import App from '../providers/App';

class Handler {

  public static notFoundHandler(_express: any): any {
    const apiPrefix = App.config().apiPrefix;

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
   * Handles your api/web routes errors/exception
   */
  public static clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);

    if (req.xhr) {
      return res.status(500).send({ error: 'Something went wrong!' });
    } else {
      return next(err);
    }
  }

  /**
   * Show undermaintenance page incase of errors
   */
  public static errorHandler(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);
    res.status(500);

    const apiPrefix = App.config().apiPrefix;
    if (req.originalUrl.includes(`/${apiPrefix}/`)) {

      if (err.name && err.name === 'UnauthorizedError') {
        const innerMessage = err && err.message ? err.message : undefined;
        return res.json({
          error: [
            'Invalid Token!',
            innerMessage
          ]
        });
      }
    }

    return res.json({
      error: err
    });
  }

  /**
   * Register your error / exception monitoring
   * tools right here ie. before "next(err)"!
   */
  public static logErrors(err: Error, req: Request, res: Response, next: NextFunction): any {
    console.error(err.stack);

    return next(err);
  }
}

export default Handler;