export default (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proficiency: {
      type: DataTypes.ENUM,
      values: ['Beginer', 'Intermediate', 'Advanced'],
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'skill',
    underscored: true,
    name: {
      singular: 'skill',
      plural: 'skills',
    },
  });

  Skill.associate = models => {
    models.Skill.belongsTo(models.User, { foreignKey: 'userId', targetId: 'id' });
  };
  return Skill;
};
