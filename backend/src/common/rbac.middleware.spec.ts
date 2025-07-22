import { RbacMiddleware } from './rbac.middleware';

describe('RbacMiddleware', () => {
  let middleware: RbacMiddleware;
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    middleware = new RbacMiddleware();
    mockReq = {};
    mockRes = {};
    mockNext = jest.fn();
  });

  it('should call next()', () => {
    middleware.use(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
}); 