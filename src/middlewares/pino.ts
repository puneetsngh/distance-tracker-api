import { NextFunction, Request, request, Response, response } from "express";
import pino, { LoggerOptions } from "pino";
import { Options, pinoHttp } from "pino-http";
import { ulid } from "ulid";

export const loggerOptions: LoggerOptions = {
  level: 'debug',
}

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const options: Options = {
    logger: pino(loggerOptions),
    genReqId: (req) => req.headers['x-request-id'] || ulid(),
    wrapSerializers: true,
    autoLogging: true,
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    },
  }
  pinoHttp(options)(req, res);
  next();
}

export default requestLogger;