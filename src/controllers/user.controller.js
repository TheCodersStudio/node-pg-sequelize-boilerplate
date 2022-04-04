import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { findAll, findById, create } from '../services/user.service.js';

const responseHandler = response.default;

const { NotFoundError } = errors.default;

const addUser = async (req, res) => {
  const userDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(userDetails));
};

const getUsers = async (req, res) => {
  const users = await findAll();
  res.status(httpStatus.OK).send(responseHandler(users));
};

const getUser = async (req, res) => {
  const user = await findById(req.params.userId);
  if (!user) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(user));
};

export {
  addUser,
  getUsers,
  getUser,
};
