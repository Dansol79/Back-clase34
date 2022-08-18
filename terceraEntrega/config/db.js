import mongoose from 'mongoose';


const conectarDB = async () => {

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI,
                                                 { useNewUrlParser: true, 

                                                   useUnifiedTopology: true
                                                });                        
                        
          
    const url =`${connection.connection.host}:${connection.connection.port}`; 

    console.log('Base de datos conectada');

    } catch (error) {
        console.log(`error: ${error.menssaje}`);
        process.exit(1);
    }
}

export default conectarDB;