export const logger = {
  info: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify({
        level: 'info',
        timestamp: new Date().toISOString(),
        message,
        ...meta
      }));
    } else {
      console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`, meta ? JSON.stringify(meta, null, 2) : '');
    }
  },

  warn: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'production') {
      console.warn(JSON.stringify({
        level: 'warn',
        timestamp: new Date().toISOString(),
        message,
        ...meta
      }));
    } else {
      console.warn(`[WARN] ${new Date().toLocaleTimeString()} - ${message}`, meta ? JSON.stringify(meta, null, 2) : '');
    }
  },

  error: (message: string, error?: any, meta?: any) => {
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack } 
      : error;

    if (process.env.NODE_ENV === 'production') {
      console.error(JSON.stringify({
        level: 'error',
        timestamp: new Date().toISOString(),
        message,
        error: errorDetails,
        ...meta
      }));
    } else {
      console.error(
        `[ERROR] ${new Date().toLocaleTimeString()} - ${message}`,
        errorDetails ? `\nError: ${JSON.stringify(errorDetails, null, 2)}` : '',
        meta ? `\nMeta: ${JSON.stringify(meta, null, 2)}` : ''
      );
    }
  }
};
