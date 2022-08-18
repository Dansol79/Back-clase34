import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    code:{
        type: Number,
        require: true
    },
    img:{
        type: String
        
    },

    price:{
        type: Number,
        require: true
    },
    stock:{
        type: String,
        require: true,
        trim: true
    },
    timestamp:{
        type: String,
        require: true,
        trim: true
    }
});

const Productos = mongoose.model('productos', productSchema);
export default Productos;