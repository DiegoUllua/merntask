import clienteAxios from './axios'

const tokenAuth = token =>{
    
    if(token){
      
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
        console.log(clienteAxios.defaults.headers.common['x-auth-token'] );
       
    }else{
        delete clienteAxios.defaults.headers.common['x-auth-token'];
        
    }
}

export default tokenAuth;