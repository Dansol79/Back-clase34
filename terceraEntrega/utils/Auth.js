export function isAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
};

export function isNotAuth(req, res, next){
    if(req.isAuthenticated()){
       res.redirect('/index');
    }else{
         next();
    }
};

export function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.admin){
        next();
    }else{
        res
            .status(403)
            .json({
                msg:'no tienes permisos para realizar esta accion, necessitas ser administrador'
            })
        }
    }