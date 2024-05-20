import { DataTypes, ENUM } from "sequelize";

import bcrypt from 'bcrypt';

export const cuserModelFile = async (sequelize) => {
    const CheckUserFile = sequelize.define('File', {
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        path:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
    return CheckUserFile;
}