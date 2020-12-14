import React,{useContext, useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ProyectoContext from '../proyectos/proyectoContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { REGISTRO_EXITOSO ,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

const AuthState = props =>{

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    const proyectoContext = useContext(ProyectoContext);

    let {obtenerProyectos} = proyectoContext;

    // funciones

    const registrarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            //console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // obtener el usuario
             usuarioAutenticado();
            
        } catch (error) {
            //console.log(error);
            const alerta= {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // retorna el usuario autenticado

    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');

        if(token){
            //to do funcion para enviar el token por headers
           
            tokenAuth(token);
            
        }

        try {
            
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
            
            console.log(respuesta);
            
        } catch (error) {
          
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // iniciar sesion

    const iniciarSesion = async datos =>{
        try {
          
            const respuesta = await clienteAxios.post('/api/auth',datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
          // obtener el usuario
           usuarioAutenticado();
           // obtener los proyectos del usuario
           obtenerProyectos();
        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // cerrar sesion

    const cerrarSesion = () =>{
       
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario:state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;