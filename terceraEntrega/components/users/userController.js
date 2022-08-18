import logger from '../../utils/winston.js';
import User from './userModel.js';
import {singUpEmail} from '../../utils/email.js';

export async function singUp(req, res){
    const newUser = new User(req.body);
    newUser.photo = req.file.filename;
    newUser.cart = [];
    singUpEmail(newUser)
    try{
        await newUser.save();
        res.redirect('/login');
    }catch(error){
        logger.error(`Error al crear el usuario: ${error}`);
    }
}