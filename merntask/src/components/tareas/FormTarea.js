import React,{useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(ProyectoContext);

    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext)

    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext



    // Efect que detecta si hay tarea seleccionada

    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])
    // state del formulario

    const [tarea, guardarTarea] = useState({
        nombre: ''

    })

    // leer los valores del form

    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }


    // extraer el nombre del proyecto

    const {nombre} = tarea

    if(!proyecto) return null

    //Array destructuring para traer el proyecto
    
   const [proyectoActual] = proyecto;


    const onSubmit = e =>{
        e.preventDefault()

        // validar
        if(nombre.trim() === ''){
            validarTarea();
            return
        }
        // pasar la validacion



        // agregar la nueva tarea al state de tareas
        if(!tareaseleccionada){
        tarea.proyecto = proyectoActual._id
        agregarTarea(tarea)

        }else {
            //Actualizo la tarea
            actualizarTarea(tarea)
            limpiarTarea()
        
        }
        // Obtener y filtrar las tareas del proyecto actual
        
        obtenerTareas(proyectoActual.id)


        // reiniciar el form

        guardarTarea({
            nombre: ''
        })




    }

    return (  
        <div className="formulario">
            <form
            onSubmit={onSubmit}
               
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea.."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}

        </div>
    );
}
 
export default FormTarea;