import { DataTypes, Sequelize  } from "sequelize";

export default (sequelize) => {

    const User = sequelize.define("User", {
        email: {type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate:{isEmail: true}
        }, 
        password: {type: DataTypes.STRING, allowNull: false}
    });
};

//Associatias and calling the fucntions
User.associate = (models) => {
    User.hasMany(models.Order, {foreignKey: "userId", as: "orders"}); 
}