import React , {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';



const NuevaCuenta = (props) => {
    // extraer los valores del context

    const alertaContext = useContext(AlertaContext);

    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;


    // en caso de que ya este autenticado

    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
         //eslint-disable-next-line
    },[mensaje, autenticado,props.history ])
    // State para iniciar Sesion

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })


    const {nombre, email, password, confirmar} = usuario;


    const onChange = e =>{

        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //Validar campos vacios
        if(nombre.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmar.trim() === "" ){

        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        return
        }
        //Password minimo 6 caracteres

        if(password.length < 6){
            mostrarAlerta('El password no puede tener menos de 6 caracteres', 'alerta-error');
            return
        }

        // Los passwords sean iguales

        if(password !== confirmar){
            mostrarAlerta('Los passwords deben ser iguales', 'alerta-error');
            return
        }

        // Llamar al action
        registrarUsuario({nombre,email,password})

    }
    return ( 
        <div className="form-usuario">
            
            <div className="contenedor-form sombra-dark">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>) :null}
                <h1>Crea una cuenta</h1>
                <form
                
                    onSubmit={onSubmit}
                >
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="confirmar">Confirmar Password</label>
                    <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Repite tu password"
                        value={confirmar}
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Registrarme"
                    />
                </div>

                </form>
                <Link to={'/'} className="enlace-cuenta">Volver a Iniciar Sesión</Link>

            </div>
        </div>
     );
}
 
export default NuevaCuenta;