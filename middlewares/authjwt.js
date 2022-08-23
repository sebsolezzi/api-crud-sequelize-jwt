import jwt from 'jsonwebtoken'
import { User } from '../models/models.js'
import { secretKey } from '../config/key.js'


export const authToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ 'msg': 'No token' })
        const decoded = jwt.verify(token, secretKey)
        const idPersona = decoded.id

        const user = await User.findOne({ where: { id: idPersona } })
        if (!user) return res.status(403).json({ 'msg': 'No user autoriza' })
        
        next()
    } catch (error) {
        console.log(error)
    }

}