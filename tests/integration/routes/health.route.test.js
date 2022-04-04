import {
  request, expect, httpStatus, server,
} from '../setup.test.js';

describe('Health Endpoint', () => {
  it('should return 200', async () => {
    const res = await request(server)
      .get('/health')
      .expect(httpStatus.OK);

    expect(res.body.uptime).to.not.be.undefined;
    expect(res.body.message).to.equal('Ok');
  });
});
