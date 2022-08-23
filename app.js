import express from 'express'
import { sequelize } from './config/db.js';
import usersRoutes from './routes/users.routes.js';
import taskRoutes from './routes/task.routes.js';


const app = express()
app.use(express.json())

app.use('/users',usersRoutes);
app.use('/tasks',taskRoutes);

//probando conexion
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    //sequelize.sync() //actualizacon tablas
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get('/ingreso',(req,res)=>{
    return res.send('hola')
})

app.listen(3333,()=>{
    console.log('server andando');
})

