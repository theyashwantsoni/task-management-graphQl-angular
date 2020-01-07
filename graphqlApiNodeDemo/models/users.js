module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );
  
    User.associate = (models) => {
      User.hasMany(models.task);
    };
  
    return User;
  }