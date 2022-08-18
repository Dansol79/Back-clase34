import logger from "../../utils/winston.js";
import Productos from "../products/productModel.js";

export async function getCartProductos(req, res) {
    try{
        const user = req.user;
        const userCart = await Promise.all(
            userCart.map(async (element) => {
                return{
                    producto: await Productos.findById(element.producto),  
                    quantity: element.quantity,
                    id: element.id
                }
            })
        );
    }catch(error){
        logger.error(`Error al obtener el carrito: ${error}`);
        return res.status(500).json({ error_description: "Error del servidor" });
    }
}

export async function deleteProducto(req, res){
    const user = req.user;
    const itemInCart = req.params.id;
    try{
        const userCart = await user.cart;
        for(let index = 0; index < userCart.length; index++){
            let id = userCart[index]._id;
            id = JSON.stringify(id);
            id = id.slice(1);
            id = id.slice(0, id.length - 1);
            if(id === itemInCart){
                userCart.splice(index, 1);
            }
        }
        await user.save();
        res.redirect('/cart');
    }catch(error){
        logger.error(`Error al eliminar el producto: ${error}`);
        return res.status(500).json({ error_description: "Error del servidor" });
    }
}