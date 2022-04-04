/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
import httpStatus from 'http-status';

class APIError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const apiErrors = Object.entries({
  BadRequest: {
    statusCode: httpStatus.BAD_REQUEST,
    message: httpStatus[httpStatus.BAD_REQUEST],
  },
  Unauthorized: {
    statusCode: httpStatus.UNAUTHORIZED,
    message: httpStatus[httpStatus.UNAUTHORIZED],
  },
  Forbidden: {
    statusCode: httpStatus.FORBIDDEN,
    message: httpStatus[httpStatus.FORBIDDEN],
  },
  NotFound: {
    statusCode: httpStatus.NOT_FOUND,
    message: httpStatus[httpStatus.NOT_FOUND],
  },
  Conflict: {
    statusCode: httpStatus.CONFLICT,
    message: httpStatus[httpStatus.CONFLICT],
  },
  UnProcessableEntity: {
    statusCode: httpStatus.UNPROCESSABLE_ENTITY,
    message: httpStatus[httpStatus.UNPROCESSABLE_ENTITY],
  },
  InternalServer: {
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
  },
  MethodNotAllowed: {
    statusCode: httpStatus.METHOD_NOT_ALLOWED,
    message: httpStatus[httpStatus.METHOD_NOT_ALLOWED],
  },
}).reduce((map, [name, data]) => {
  map[`${name}Error`] = map[name] = class extends APIError {
    constructor(message = data.message) {
      super(data.statusCode, message);
    }
  };
  return map;
}, {});

export default {
  ...apiErrors,
  APIError,
};
