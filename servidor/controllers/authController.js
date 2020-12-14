
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


exports.autenticarUsuario = async (req,res) =>{

    const errores = validationResult(req);


    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // extraer email y password

    const {email,password} = req.body;

    try {
        
        // revisar que este registrado

        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        // revisar password

        const passCorrecto = await bcryptjs.compare(password, usuario.password)

        if(!passCorrecto){
            return res.status(400).json({msg: 'Password incorrecto'});
        }

        // si todo es correcto creamos el JWT

        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el toquen

        jwt.sign(payload,process.env.SECRETA,{
            
            expiresIn:3600
        },(error,token)=>{
            if(error) throw error;

             //Mensaje de exito

             res.json({token});
        })

    } catch (error) {
        console.log(error)
    }

    

}


// obtiene el usuario autenticado

exports.usuaroAutenticado = async(req,res) =>{

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'hubo un errorsito'})
    }
}