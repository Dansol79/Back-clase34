import Productos from '../components/products/productModel.js';
import userRouter from '../components/users/userRoutes.js'
import productRouter from '../components/products/productRouter.js'
import ordenRouter from '../components/orden/ordenRouter.js';
import cartRouter from '../components/carts/cartRouter.js';
import logger from "../utils/winston.js";
import {isAuth} from '../utils/Auth.js';


export default (app) => {
    productRouter(app);
    cartRouter(app);
    app.use(userRouter); 
    app.use(ordenRouter);

    app.get('/', isAuth, async (req, res) => {
        const user = req.user
        try{
            const productos = await Productos.find({});
            res.render('index', {user, productos})
        }catch(error){
            logger.error(`Error al obtener los productos: ${error}`);
        }
    })

    app.get('*', (req, res) => {
        res.status(404).json({ 
        error: -2,
        description: `ruta ${req.originalUrl} metodo get no implementado`
        });
    });
}