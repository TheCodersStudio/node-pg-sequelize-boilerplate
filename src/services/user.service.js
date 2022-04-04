import db from '../models/index.js';

const { User, Skill } = db.db;

const findAll = async () => User.findAll({
  include: [
    { model: Skill },
  ],
});

const findById = async userId => User.findOne({
  where: { id: userId },
  include: [
    { model: Skill },
  ],
});

const create = async data => User.create(data, {
  include: [
    { model: Skill },
  ],
});

export {
  findAll,
  findById,
  create,
};
