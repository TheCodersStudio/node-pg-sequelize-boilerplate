/* eslint no-underscore-dangle: 0 */

import fs from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../config/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = basename(__filename);
const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== base) && (file.slice(-3) === '.js'));

await Promise.all(files.map(async file => {
  const model = (await import(join(__dirname, file))).default(sequelize, DataTypes);
  db[model.name] = model;
}));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default {
  db,
};
