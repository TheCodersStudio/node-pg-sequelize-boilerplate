/**
 * Model class for "skill"
 *
 * @author Chetan Patil
 *
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns User - sequelize model for user entity
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female', 'Other'],
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'user',
    underscored: true,
  });

  User.associate = models => {
    models.User.hasMany(models.Skill, { foreignKey: 'userId', targetId: 'id' });
  };
  return User;
};
