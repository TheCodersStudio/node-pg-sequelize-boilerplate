import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { addUser, getUsers, getUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * /v1/users:
 *   post:
 *     tags:
 *       - v1
 *     description: Health Endpoint
 *     responses:
 *       200:
 *         description: Application helath details.
 */
router
  .route('/')
  .post(validate({ body: addUserSchema }), addUser)
  .get(getUsers);

router
  .route('/:userId')
  .get(getUser);

export default router;
