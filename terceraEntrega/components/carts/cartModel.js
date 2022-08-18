import mongoose from "mongoose";

const casrtItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
    },
    quantity:{type: Number, require: true, trim: true}
});

export default casrtItemSchema;