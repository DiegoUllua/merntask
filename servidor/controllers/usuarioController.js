
const Usuario = require('../models/Usuario');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.crearUsuario = async (req,res) =>{

    // revisar si hay errores

    const errores = validationResult(req);


    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    // extraer email y pass

    const {email, password} = req.body;



    try {

        // Checkear que el user no exista
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        //crea el user

        usuario = new Usuario(req.body);

        // hashear el password

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        // guardar el user

        await usuario.save();


        //crear y firmar el jsonwebtoken

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
        console.log(error);
        res.status(400).send('hubo un error');
    }
}