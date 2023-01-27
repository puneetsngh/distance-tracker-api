import { Request } from "express";
import pino, { LoggerOptions } from "pino";
import { ulid } from "ulid";
import ILogger from "../interfaces/ILogger";
import { loggerOptions } from "./pino";

class Logger implements ILogger {
  protected logger: pino.BaseLogger;
  constructor(req: Request, name?: string) {
    this.logger = pino(loggerOptions).child({ name, reqId: req.id || ulid() });
  }
  info(message: string, obj: object) {
    this.logger.info(obj, message);
  }

  error(message: string, err: object) {
    this.logger.error(err, message);
  }
  warn(message: string, obj?: object) {
    this.logger.warn(obj, message);
  }
  debug(message: string, obj?: object) {
    this.logger.debug(obj, message);
  }
}

export default Logger;