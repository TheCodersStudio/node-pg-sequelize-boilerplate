import { Sequelize, Transaction } from 'sequelize';
import { createNamespace } from 'cls-hooked';

const namespace = createNamespace('my-namespace');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  },
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
