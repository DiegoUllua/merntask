import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        PROYECTO_ERROR,
        ELIMINAR_PROYECTO } from '../../types';




const ProyectoState = props => {


    const initialState = {
        formulario: false,
         proyectos : [],
         errorformulario: false,
         proyecto: null,
         mensaje: null
    }

    // Dispatch para ejecutas las acciones

    const[state,dispatch] = useReducer(proyectoReducer,initialState)


    //Funciones para el CRUD

    const mostrarFormulario = () =>{

        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos =async () =>{

        try {
            const resultado = await clienteAxios.get('/api/proyectos');
           
            dispatch({
                type:OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
          
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error en obtener proyectos',
                categoria: 'alerta-error'
                }   
               dispatch({
                   type: PROYECTO_ERROR,
                   payload: alerta
               })
        }
        
    }

    const agregarProyecto = async proyecto =>{
     try {
         const resultado = await clienteAxios.post('/api/proyectos',proyecto)

         console.log(resultado);

         dispatch({
             type: AGREGAR_PROYECTO,
             payload: resultado.data
         })
     } catch (error) {

            const alerta = {
            msg: 'Hubo un error al agregar el proyecto',
            categoria: 'alerta-error'
            }
           dispatch({
               type: PROYECTO_ERROR,
               payload: alerta
           })
       }
     }
    

    // Validar form por errores

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto que el usuario dio click

    const proyectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //eLIMINA UN PROYECTO

    const eliminarProyecto = async proyectoId =>{
       try {

        await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
       } catch (error) {

        const alerta = {
            msg: 'Hubo un error al eliminar el proyecto',
            categoria: 'alerta-error'
            }   
           dispatch({
               type: PROYECTO_ERROR,
               payload: alerta
           })
       }
    }

    return (
        <proyectoContext.Provider
        
            value={{
                proyectos:state.proyectos,
                formulario:state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState