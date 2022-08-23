import { User } from '../models/models.js'
import { secretKey } from '../config/key.js'
import jtw from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const saltRounds = 10;
export const createUser = async (req, res) => {

    const userName = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = User.build({ userName, password: hashedPassword })
        await newUser.save()

        return res.status(200).json({ 'msg': 'user created' });
    } catch (error) {
        console.log(error);
    }

}

export const loginUser = async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ where: { username: userName } })

        if (!user) return res.status(404).json({ 'msg': 'Usuario no registrado' });

        if (await bcrypt.compare(password, user.password)) {

            const token = jtw.sign({id:user.id},secretKey,{expiresIn:"30d"})
            return res.status(200).json({'id':user.id, 'username': user.userName, 'token': token });
        } else {
            return res.status(404).json({ 'msg': 'User or password bad' });
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({ 'msg': 'Invalid token' });
    }
}