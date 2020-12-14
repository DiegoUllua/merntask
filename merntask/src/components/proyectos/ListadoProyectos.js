import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import {CSSTransition, TransitionGroup}from 'react-transition-group'
import AlertaContext from '../../context/alertas/alertaContext';


const ListadoProyectos = () => {
    //Extraer proyectos de state inicial
   const proyectosContext = useContext(proyectoContext);

   const {mensaje,proyectos, obtenerProyectos} = proyectosContext;


   const alertaContext = useContext(AlertaContext);
   const {alerta, mostrarAlerta} = alertaContext;

   useEffect(()=>{

    if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos()

    //eslint-disable-next-line
   },[mensaje]);

   //revisar si hay proyectos
   
   if(proyectos.length === 0  ) return <p>No hay proyectos, comienza creando uno</p>;

  

    return (  
        <ul className="listado-proyectos">

            {alerta ?(
                <div className={`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                </div>
            ) : null}
            <TransitionGroup>

           
            {proyectos.map(proyecto =>(
                <CSSTransition
                key={proyecto._id}
                timeout={200}
                classNames="proyecto"
                >
                <Proyecto
                
                proyecto={proyecto}
                >

                </Proyecto>
                </CSSTransition>
            ))}
             </TransitionGroup>
        </ul>

    );
}
 
export default ListadoProyectos;