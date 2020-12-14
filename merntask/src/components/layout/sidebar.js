import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'

const SideBar = () => {
    return ( 
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NuevoProyecto></NuevoProyecto>
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>
     );
}
 
export default SideBar;