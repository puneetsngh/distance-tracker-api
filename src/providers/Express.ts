import express from 'express';
import App from './App';
import Routes from './Routes';
import ExceptionHandler from '../exceptions/Handler';

class Express {
  /**
   * Create the express object
   */
  public express: express.Application;

  /**
   * Initializes the express server
   */
  constructor() {
    this.express = express();

    this.mountDotEnv();
    this.mountRoutes();
  }

  private mountDotEnv(): void {
    this.express = App.init(this.express);
  }
  /**
   * Mounts all the defined routes
   */
  private mountRoutes(): void {
    this.express = Routes.mountWeb(this.express);
    this.express = Routes.mountApi(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): any {
    const port: number = App.config().port;

    // Registering Exception / Error Handlers
    this.express.use(ExceptionHandler.logErrors);
    this.express.use(ExceptionHandler.clientErrorHandler);
    this.express.use(ExceptionHandler.errorHandler);
    this.express = ExceptionHandler.notFoundHandler(this.express);

    // Start the server on the specified port
    this.express.listen(port, () => {
      return console.log('\x1b[33m%s\x1b[0m', `Server Running 'http://localhost:${port}'`);
    }).on('error', (_error) => {
      return console.log('Error: ', _error.message);
    });;
  }
}

/** Export the express module */
export default new Express();