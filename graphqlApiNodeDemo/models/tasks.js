module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        description: DataTypes.STRING,
        status: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        freezeTableName: true,
      }
    );
  
    Task.associate = (models) => {
      Task.belongsTo(models.user);  
      Task.belongsTo(models.project);  
    };
  
    return Task;
  }