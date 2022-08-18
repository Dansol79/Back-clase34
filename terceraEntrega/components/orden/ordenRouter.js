import { Router } from "express";
import{checkOut, getUserOrdenes, getOrdenes} from "./ordenController.js"

const ordenRouter = new Router();

ordenRouter.post('/order', checkOut);

ordenRouter.get('/order/:id', getUserOrdenes);

ordenRouter.get('/orders/list', getOrdenes);

ordenRouter.get('/orderSuccess', (req, res) => {
    res.render('ordenSuccess');
})

export default ordenRouter;