const gracefulShutdown = async server => {
  try {
    // await sequelize.close();
    console.info('Closed database connection!');
    server.close();
    process.exit();
  } catch (error) {
    console.info(error.message);
    process.exit(1);
  }
};

export {
  gracefulShutdown,
};
