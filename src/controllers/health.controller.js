import httpStatus from 'http-status';

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
