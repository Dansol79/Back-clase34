import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import conectarDB from "./config/db.js";
import {dirname} from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import passport from "passport";
import routes from "./routes/routes.js";
import cluster from "cluster";
import os from "os";
const numCPUs = os.cpus().length;
import logger from "./utils/winston.js";



dotenv.config();
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs' );
app.set('views', __dirname + '/views');

// Conectar bd
conectarDB();


// Session 
app.use(
    session({
        secret: "contraseña",
        cookie:{
            httpOnly: false,
            secure: false,
            maxAge: 60000 * 60,
        },
        resave: false,
        saveUninitialized: false,
        rolling:true,
    }) 
); 

// Passport autentication
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
   console.log(req.session);
   console.log(req.user);
   next();
});

// middlewares 
app.use(cors(`${process.env.PORT}`));
app.use(cookieParser());

const PORT = process.env.PORT;


// Routes
routes(app);

const mode = process.env.MODE;

if(mode === 'FORK'){
    const server = app.listen(PORT, () => {
        logger.log('Servidor inciado en puerto principal')
    });

    server.on('error', (error) => {
        logger.error('error', 'error del servido', error);
    });

    process.on('exit', (code) => {
        logger.info('info', 'Exit code ->' + code);
    })
}

if(mode === 'CLUSTER'){
    if(cluster.isMaster){
        console.log(`Master -> PID: ${process.pid}`);
    }
    console.log('cpus..', numCPUs);
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.log('warm', `worker ${worker.process.pid} died`);
        cluster.fork();
    })
}else{
    const server = app.listen(PORT, () => {
        logger.log(
            'info',
            `Servidor inciado en puerto ${server.address().port} con pid ${process.pid}`
        )
    });

    server.on('error', (error) => {
        logger.error('error', 'error del servido', error);
    });
    
    process.on('exit', (error) => {
        logger.info('error', 'Exit code ->' + error);
    });
    

}



