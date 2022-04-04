import * as errors from '../utils/api-error.js';

const { NotFoundError } = errors.default;

export default async (req, res, next) => next(new NotFoundError());
