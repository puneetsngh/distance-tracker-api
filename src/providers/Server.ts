import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';

class Server {
  // Clear the console
  public clearConsole(): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  // Loads your Server
  public loadServer(): void {
    console.log('Server :: Starting...');
    Express.init();
  }

}

export default new Server;