import argon2 from "argon2";

export default (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        email: {type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate:{isEmail: true}
        }, 
        password: {type: DataTypes.STRING, allowNull: false}
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if(user.password) {
                    user.password = await argon2.hash(user.password);
                }
            }
        }
    });

    //Instance method: hashing updated password
    User.prototype.setPassword = async function (plainPassword){
        const hashedPassword = await argon2.hash(plainPassword); 
        this.password = hashedPassword; 
    }
    //Associatias and calling the fucntions
    User.associate = (models) => {
        User.hasMany(models.Order, {foreignKey: "userId", as: "orders"}); 
    };
    return User;
};
