import mongoose from "mongoose";

const ordenSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true,
        trim: true
    },
    productos:[],
    emailUser:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    date:{
        type: String,
        require: true,
        trim: true
    },
    state:{
        type: String,
        require: true,
        trim: true
    }
});

const Orden = mongoose.model('orden', ordenSchema);

export default Orden;