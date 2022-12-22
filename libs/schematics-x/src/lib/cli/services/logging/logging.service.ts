import { logging } from "@angular-devkit/core";
import { Injectable } from "@nx-ddd/core";

@Injectable()
export class LoggingService extends logging.IndentLogger {
  constructor() { super('sx-cli'); }
}
