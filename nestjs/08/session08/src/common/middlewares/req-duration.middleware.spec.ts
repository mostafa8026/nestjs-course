import { ReqDurationMiddleware } from './req-duration.middleware';

describe('ReqDurationMiddleware', () => {
  it('should be defined', () => {
    expect(new ReqDurationMiddleware()).toBeDefined();
  });
});
