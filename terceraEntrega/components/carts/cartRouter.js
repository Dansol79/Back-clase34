import { Router } from 'express';
import { isAuth } from '../../utils/Auth.js';
import {getCartProductos, deleteProducto} from './cartController.js';

const cartRouter = new Router();

export default (app) => {
    app.use('/cart', cartRouter);

    cartRouter.get('/', isAuth, getCartProductos);

    cartRouter.delete('/:id', isAuth, deleteProducto);

}