/**
 * User service which serves DB operation
 * required by user controller
 *
 * @author Chetan Patil
 */
import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - User & Skill model extracted from db import
 */
const { User, Skill } = db.db;

/**
 * findAll function to retrieve all available users in system
 *
 * @returns {Promise} User object array
 */
const findAll = async () => User.findAll({
  include: [
    { model: Skill },
  ],
});

/**
 * findById function to fetch data for provided userId
 *
 * @param {number} userId - user id for which data needs to be fetched
 * @returns {Promise} User object
 */
const findById = async userId => User.findOne({
  where: { id: userId },
  include: [
    { model: Skill },
  ],
});

/**
 * create function to add new user
 *
 * @param {object} data - user object with information to be saved in system
 * @returns {Promise} Created user object
 */
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
