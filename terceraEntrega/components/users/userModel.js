import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cartItemSchema from '../carts/cartModel.js'

const userSchema = new mongoose.Schema({
    
    email:{
        type: String,
        require: true,
        lowercase: true,
        trim: true

    },
    
    password:{
        type: String,
        require: true,
        trim: true,
    },
    name:{
        type: String,
        require: true,
        trim: true
    },
    phone:{
        type: String,
        require: true,
        trim: true
    },
    bithDate:{
        type: Date,
        require: true,
    },
    address:{
        type: String,
        require: true,
        trim: true
    },
    photo:{
        type: String,
        require: true,
        trim: true
    },
    cart:[cartItemSchema]

});

userSchema.pre('save', async function(){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12);
    }
});

const User = mongoose.model('user', userSchema);

export default User;