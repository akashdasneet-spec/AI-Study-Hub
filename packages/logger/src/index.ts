export class Logger {
  static info(message: string, context?: Record<string, unknown>) {
    console.log(JSON.stringify({ level: 'info', message, context, timestamp: new Date().toISOString() }));
  }

  static error(message: string, error?: unknown) {
    console.error(JSON.stringify({ level: 'error', message, error, timestamp: new Date().toISOString() }));
  }
}
