/**
 * Health controller
 *
 * @author Chetan Patil
 */
import httpStatus from 'http-status';

/**
 * Health controller entry function
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getHealth = async (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  res.status(httpStatus.OK).send(data);
};

export {
  getHealth,
};
