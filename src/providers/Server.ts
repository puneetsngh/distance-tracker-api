import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';
import App from './App';

class Server {
  // Clear the console
  public clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  // Loads your dotenv file
  public loadConfiguration(): void {
    console.log('Configuration :: Booting @ Master...');

    dotenv.config({ path: path.join(__dirname, '../../.env') });
  }

  // Loads your Server
  public loadServer(): void {
    console.log('Server :: Booting @ Master...');

    Express.init();
  }

}

export default new Server;