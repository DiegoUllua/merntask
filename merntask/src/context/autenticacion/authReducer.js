import { REGISTRO_EXITOSO ,
        REGISTRO_ERROR,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        OBTENER_USUARIO,
        CERRAR_SESION
} from '../../types';



// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action)=>{
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                mensaje: action.payload,
                usuario: null,
                autenticado: null,
                cargando: false
            }
        default:
            return state;
    }

}