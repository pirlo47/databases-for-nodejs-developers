import { DataTypes } from "sequelize";

export default (seqelize, DataTypes) => {
    const Order = seqelize.define("Order", {
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: False
        }, 
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending"
        }
    });
    //create associates
    Order.asssociate = (models) => {
        Order.belongsTo(models.User, {foreignKey: "userID", as: "user"});
        Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "items"})
    };
    return Order; 
}
