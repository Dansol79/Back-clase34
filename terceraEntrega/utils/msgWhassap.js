import twilio from "twilio";
import logger from "./winston.js";

const accountSid = 'AC5c858b74df7b99d5274e5b9b3c0f44a0'; 
const authToken = '[Redacted]'; 
const client = twilio(accountSid, authToken, {
     lazyLoading:true
    });
 

export async function checkOutSms(userPhone){
    try{
        
        const message = await client.messages 
        .create({ 
           body: 'Hola nos comunicamos desde Dolce para informarte:Tu pedido ha sido recibido y se encuentra en proceso!', 
           from: '+14155238886',       
           to: '+5491164074557' 
         });
         logger.log(message)

    }catch(error){
        logger.log(`Error al enviar el mensaje: ${error}`);
  
    }
}
export async function checkOutWhatsapp(orden){
    try{
        const message = await  client.messages.create({ 
           body: 'Nuevo pedido de ${orden.userName}, ${orden.userEmail}', 
           from: 'whatsapp:+14155238886',       
           to: 'whatsapp:+5491164074557' 
         });
         logger.log(message)

    }catch(error){
        logger.log(`Error al enviar whatsapp: ${error}`);
    }
}