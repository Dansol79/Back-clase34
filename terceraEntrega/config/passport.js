import passport from "passport";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const localStrategy = passportLocal.Strategy;
import User from '../components/users/userModel.js'

const customFields = {
    usernameField: "email",
    passwordField: "password"
};

const verifyCallback = async (email, password, done) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            return done(null, false)
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(isValid){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(error){
        done(error);
    }
};

const strategy = new localStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
        done(null, user);   
    })
    .catch((error) => {
        done(error);
    });
});