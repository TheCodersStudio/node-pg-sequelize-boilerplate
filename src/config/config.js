/**
 * Config details
 *
 * @author Chetan Patil
 *
 */
import 'dotenv/config';

export default {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
};
