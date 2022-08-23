import jwt from 'jsonwebtoken'
import { User } from '../models/models.js'
import { secretKey } from '../config/key.js'


export const checkToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(403).json({'mgs':'Token invalido'});
    }
}