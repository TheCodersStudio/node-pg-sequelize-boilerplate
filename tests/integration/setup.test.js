import request from 'supertest';
import { expect } from 'chai';
import httpStatus from 'http-status';

import server from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');

export {
  request,
  expect,
  httpStatus,
  server,
};
