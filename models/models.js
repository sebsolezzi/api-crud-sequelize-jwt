import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }

})
 
export const Task = sequelize.define('task',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    taskName:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    }
})

//Un usuario tiene muchas tareas y una tarea le pertenece a un usuario
User.hasMany(Task)
Task.belongsTo(User)