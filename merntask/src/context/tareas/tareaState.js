

import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'

import {TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
    } from '../../types'

const TareaState = props =>{

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch y state

    const [state,dispatch] = useReducer(TareaReducer, initialState);


    // funciones

    // Obtener las tareas de un proyecto

    const obtenerTareas = async proyecto =>{

        console.log(proyecto)
        try {
            const resultado = await clienteAxios.get('/api/tareas',{params: {proyecto}});

            console.log(resultado)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado

    const agregarTarea = async tarea =>{
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
            console.log(resultado);
            dispatch({
                type:AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    // Valida y muestra un error si es necesario

    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    // Eiminar una tarea por id 

    const eliminarTarea = async (tareaId, proyecto) =>{
        try {

            await clienteAxios.delete(`/api/tareas/${tareaId}`, {params:{proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Cambia el estado de cada tarea

    const actualizarTarea = async tarea =>{

       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload: resultado.data.tarea
        })
       } catch (error) {
           console.log(error)
       }
    }


    // Extrae una tarea para edicion

    const guardarTareaActual = tarea =>{
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }

  
  
    // Limpiar la tarea seleccionada

    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;