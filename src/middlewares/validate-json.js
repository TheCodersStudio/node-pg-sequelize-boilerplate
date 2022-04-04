import * as errors from '../utils/api-error.js';

const { BadRequestError } = errors.default;

export default async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    throw new BadRequestError(err.message);
  }
  return next();
};
