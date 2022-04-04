import db from '../src/models/index.js';

const { User, Skill } = db.db;

const truncateTables = async () => {
  await Skill.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
};

const insertData = async data => {
  await User.create(data, {
    include: [
      { model: Skill },
    ],
  });
};

export {
  truncateTables,
  insertData,
};
