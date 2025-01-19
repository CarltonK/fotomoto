const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };
  
  export const mockLoggerProvider = {
    provide: 'winston',
    useValue: mockLogger,
  };