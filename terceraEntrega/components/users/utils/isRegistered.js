import User from '../userModel.js';

export default async function isRegistered(req, res, next){
    const {email} = req.body;
    
    const existe = await User.find({email : email});
    if(existe.length){
        res.render('signup-UsuarioRegistrado')
        return;
    }
    next();
}