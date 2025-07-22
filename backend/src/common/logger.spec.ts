import logger from './logger';
import winston from 'winston';

jest.mock('winston', () => {
  const mFormat = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    splat: jest.fn(),
    json: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
  };
  const mTransports = {
    Console: jest.fn(),
    File: jest.fn(),
  };
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    }),
    format: mFormat,
    transports: mTransports,
  };
});

jest.mock('winston-daily-rotate-file', () => jest.fn());

describe('logger', () => {
  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should have logging methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.log).toBe('function');
  });

  it('should call info without error', () => {
    expect(() => logger.info('test info')).not.toThrow();
  });

  it('should call error without error', () => {
    expect(() => logger.error('test error')).not.toThrow();
  });
}); 