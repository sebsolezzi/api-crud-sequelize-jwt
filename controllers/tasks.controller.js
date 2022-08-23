import jwt from 'jsonwebtoken';
import { Task } from '../models/models.js';
import { secretKey } from '../config/key.js';

export const getTasks = async (req, res) => {

    if (jwt.verify(req.token, secretKey)) {
        const user = jwt.decode(req.token)
        const result = await Task.findAll({ where: { userId: user.id } })
        return res.json({ 'msg': 'Ok', 'task': result })
    } else {
        return res.json({ 'msg': 'usuario no autorizado' })
    }

}

export const createTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token)
            const taskName = req.body.taskname;
            const userId = user.id


            const newTask = Task.build({ taskName, userId })
            const respose = await newTask.save()

            return res.status(200).json({ 'msg': 'Ok', 'task': respose })
        } catch (error) {
            console.log(error)
        }
    } else {
        return res.status(403).json({ 'msg': 'usuario no autorizado' })
    }
}

export const deleteTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token)
            const id = req.params.id;
            const userId = user.id


            const row = await Task.destroy({
                where: {
                    id,
                    userId
                }
            })

            if (row > 0) {
                return res.status(200).json({ 'msg': 'Task deleted' })
            } else {
                return res.status(403).json({ 'msg': 'usuario no autorizado' })
            }

        } catch (error) {
            console.log(error)
        }
    } else {
        return res.status(403).json({ 'msg': 'usuario no autorizado' })
    }
}
export const updateTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token);
            const id = req.params.id;
            const taskName = req.body.taskname;
            const userId = user.id;
            console.log(id)
            console.log(userId)


            await Task.update({
                taskName
            }, {
                where: {
                    id,
                    userId
                }
            })

            const updateTask = await Task.findOne({
                where: {
                    id,
                    userId
                }
            })

            return res.status(200).json({ 'msg': 'Ok', 'task': updateTask })

        } catch (error) {
            console.log(error)
            return res.status(404).json({ 'msg': 'error al borrar' })
        }
    } else {
        return res.status(403).json({ 'msg': 'usuario no autorizado' })
    }
}   