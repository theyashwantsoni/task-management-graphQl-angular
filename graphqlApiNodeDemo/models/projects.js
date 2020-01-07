module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        randomId : DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );

    Project.associate = (models) => {
      Project.hasMany(models.task);
      Project.hasMany(models.user);
    };
  
    return Project;
  }