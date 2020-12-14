import React,{useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {


    const proyectosContext = useContext(ProyectoContext);

    const {proyectoActual} = proyectosContext
   
    const tareasContext = useContext(tareaContext)

    const {obtenerTareas} = tareasContext

    // Funcion para agregar el proyecto actual

    const seleccionarProyecto = id =>{
        proyectoActual(id) // Fijar el proyecto actual
        obtenerTareas(id) // filtrar las tareas del proyecto
    }

  

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> seleccionarProyecto(proyecto._id)}
            >
            {proyecto.nombre}
            </button>
        </li>
      );
}
 
export default Proyecto;