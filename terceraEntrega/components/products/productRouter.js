import { Router } from "express";
import {getProductos,getProducto,createProducto,updateProducto,deleteProducto, addProductToCart } from "./productContoller.js";

const productRouter = new Router();

export default (app) => {
    app.use('/products', productRouter);

    productRouter.get('/list', getProductos);

    productRouter.get('/list/:id', getProducto);

    productRouter.post('/list/:id', addProductToCart);

    productRouter.post('/create', createProducto);

    productRouter.put('/update/:id', updateProducto);

    productRouter.delete('/delete/:id', deleteProducto);

}
