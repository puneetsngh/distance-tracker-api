export interface ILogger {
  info(message: string, obj: object): any

  error(message: any, obj?: object): any

  warn(message: any, obj?: object): any

  debug(message: any, obj?: object): any
}

export default ILogger;