import Orden from './ordenModel.js'
import Productos from '../products/productModel.js'
import { checkOutSms, checkOutWhatsapp } from '../../utils/msgWhassap.js'
import { checkOutEmail } from '../../utils/email.js'
import logger from '../../utils/winston.js'
import moment from 'moment'
export async function checkOut(req, res){
    const user = req.user;
    let { cart, email} = user;
    try{
        const productsInCart = await Promise.all(
            cart.map(async (element) => {
                const producto = await Productos.findById(element.producto);
                return {
                    producto: producto.name,
                    quantity: element.quantity,
                };
            })
        );
        const newOrden = new Orden({
            userName: user.name,    
            productos: productsInCart,
            emailUser: email,
            date: moment(new Date()).format('DD/MM/YYYY'),
            state: 'Generado',
        });

        user.cart = [];
        checkOutEmail(newOrden);
        checkOutSms(user.phone);
        checkOutWhatsapp(newOrden);
        await user.save();
        await newOrden.save();
        res.redirect('/ordenSuccess');
    }catch(error){
        logger.error(`Error al obtener los productos: ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor'});
    }
}

export async function getUserOrdenes(){
    const user = req.user;
    try {
      const orden = await Orden.findOne({ userEmail: user.email });
      return res.render('orden', { orden });
    } catch (error) {
      logger.error(`Error al listar pedido. ${error}`);
      return res.status(500).json({ error_description: 'Error del servidor.' });
    }
}

export async function getOrdenes(){
    try {
        const orden = await Orden.find({});
        return res.render('orden', { orden });
      } catch (error) {
        logger.error(`Error al listar pedido. ${error}`);
        return res.status(500).json({ error_description: 'Error del servidor.' });
      }

}


