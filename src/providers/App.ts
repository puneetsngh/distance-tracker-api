import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class App {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 3000;
    const name = process.env.APP_NAME || 'App';

    return {
      name,
      port,
      url,
    };
  }

  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default App;