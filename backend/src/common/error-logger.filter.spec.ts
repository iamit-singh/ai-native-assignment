import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorLoggerFilter } from './error-logger.filter';
import logger from './logger';

describe('ErrorLoggerFilter', () => {
  let filter: ErrorLoggerFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: any;

  beforeEach(() => {
    filter = new ErrorLoggerFilter();
    mockRequest = {
      method: 'GET',
      url: '/test',
      body: { foo: 'bar' },
      query: { q: '1' },
      params: { id: '123' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as unknown as ArgumentsHost;
    jest.spyOn(logger, 'error').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle HttpException', () => {
    const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
        path: '/test',
      })
    );
    expect(logger.error).toHaveBeenCalled();
  });

  it('should handle generic Error', () => {
    const exception = new Error('Something went wrong');
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
        path: '/test',
      })
    );
    expect(logger.error).toHaveBeenCalled();
  });

  it('should handle unknown exception', () => {
    const exception = { foo: 'bar' };
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        path: '/test',
      })
    );
    expect(logger.error).toHaveBeenCalled();
  });
}); 