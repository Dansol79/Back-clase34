import logger from "../../utils/winston.js";
import Productos from "./productModel.js";


export async function getProductos(req, res){
    try{
        const productos = await Productos.find({});
        res.json({productos});
    }catch(error){
        logger.error(`Error al obtener los productos: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}

export async function getProducto(res, req){
    
    try{
        const producto = await Productos.findById(req.params.id);
       console.log(producto);
        if (!producto)
          return res
            .status(400)
            .json({ error_description: 'Producto no encontrado.' });
    
        res.cookie('id', producto._id)
        res.render('producto', {
            producto: producto._id,
            user: req.user

        });

    }catch(error){
        logger.error(`Error al obtener el producto: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}

export async function createProducto(req, res){ 
    try{
       const {name, description, code, img, price, stock} = req.body;
       if(
         !(name?.length > 0) ||
         !(description?.length > 0) ||
         !(String(code)?.length > 0) ||
         !(img?.length > 0) ||
         !(Number(price)) ||
         !(Number(stock))
       ){
            return res
                .status(400)
                .json({ error_description: "Faltan datos"});
       }
       const newProducto = await Productos.create({
          name,
          description,
          code,
          img,
          price,
          stock
       });

       return res.status(201).json({producto: newProducto});

    }catch(error){
        logger.error(`Error al crear el producto: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}

export async function updateProducto(req, res){
    try{
        const {name, description, code, img, price, stock} = req.body;
        if(
            !(name?.length > 0) ||
            !(description?.length > 0) ||
            !(String(code)?.length > 0) ||
            !(img?.length > 0) ||
            !(Number(price)) ||
            !(Number(stock))
        ){
            return res
                .status(400)
                .json({ error_description: "Los datos son incorrectos"});
        }

        const id = req.params.id;
        const updateProducto = {name, description, code, img, price, stock};    

        if(await Productos.findByIdAndUpdate(id, updateProducto)){
            const producto = {
                _id: id,
                ...updateProducto,
            };
            return res.status(200).json({producto});
        }
        return res
                .status(400)
                .json({ error_description: "El producto no existe"});

    }catch(error){
        logger.error(`Error al actualizar el producto: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}

export async function deleteProducto(req, res){
    try{

        const producto = await Productos.findByIdAndDelete(req.params.id);
        if(!producto){
            return res
                .status(400)
                .json({ error_description: "No se econtró el producto"});
        }

        res.status(200).json({producto});
    }catch(error){
        logger.error(`Error al eliminar el producto: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}

export async function addProductToCart(req, res){
    try{
        const productId = req.cookie.id;
        const {quantity} = req.body;    
        const user = req.user;
        const productToCart = {
            productId,
            quantity
        }
        user.cart.push(productToCart);
        await user.save();
        res,redirect('/');
    }catch(error){
        logger.error(`Error al agregar el producto al carrito: ${error}`);
        return res.status(500).json({ error_description: "Error de servidor"});
    }
}