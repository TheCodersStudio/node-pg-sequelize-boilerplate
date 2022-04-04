import { readFile } from 'fs/promises';
import {
  request, expect, httpStatus, server,
} from '../../setup.test.js';
import { truncateTables, insertData } from '../../../db.test.js';

let data;

describe('Users Endpoint', () => {
  before((async () => {
    data = JSON.parse(await readFile(new URL('../../../fixtures/input.json', import.meta.url)));
  }));

  describe('POST /v1/users', () => {
    before(async () => {
      await truncateTables();
    });

    it('should return 201 and successfully create new user', async () => {
      const res = await request(server)
        .post('/v1/users')
        .send(data.valid)
        .expect(httpStatus.CREATED);

      expect(res.body).to.have.property('body');
      expect(res.body.body.id).to.not.be.undefined;
    });

    it('should return error if input schema validation fails', async () => {
      const res = await request(server)
        .post('/v1/users')
        .send(data.schemaError)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.id).to.be.undefined;
      expect(res.body.success).to.be.false;
      expect(res.body.error).to.have.property('body');
    });
  });

  describe('GET /v1/users', () => {
    before(async () => {
      await truncateTables();
    });

    it('should return 200 and successfully fetched all avaialble users', async () => {
      await insertData(data.valid);

      const res = await request(server)
        .get('/v1/users')
        .expect(httpStatus.OK);

      expect(res.body).to.have.property('body');
      expect(res.body.body).to.be.an('array');
      expect(res.body.body).not.empty;

      expect(res.body.body[0].id).to.not.be.undefined;
      expect(res.body.body[0].firstName).to.equal(data.valid.firstName);
      expect(res.body.body[0].lastName).to.equal(data.valid.lastName);
      expect(res.body.body[0].gender).to.equal(data.valid.gender);
    });
  });
});
