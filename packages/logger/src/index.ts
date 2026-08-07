export interface LogPayload {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  correlationId?: string;
  timestamp: string;
  [key: string]: any;
}

export function logInfo(message: string, meta?: object): void {
  console.log(JSON.stringify({ level: 'info', message, timestamp: new Date().toISOString(), ...meta }));
}

export function logWarn(message: string, meta?: object): void {
  console.warn(JSON.stringify({ level: 'warn', message, timestamp: new Date().toISOString(), ...meta }));
}

export function logError(message: string, error?: any, meta?: object): void {
  console.error(
    JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      error: error?.message || error,
      stack: error?.stack,
      ...meta,
    })
  );
}

export function logDebug(message: string, meta?: object): void {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(JSON.stringify({ level: 'debug', message, timestamp: new Date().toISOString(), ...meta }));
  }
}

