import mongoose from 'mongoose';
import 'dotenv/config';



const config = {
    mongoDB:{
        URL: `${process.env.MONGODB_URI}`,
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}

export const conectarDB = async () =>{
    try {
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
        console.log("Conexion a base de datos exitosa");
      } catch (error) {
        console.log("Error en la conexión a mongoDB", error);
      }
}

