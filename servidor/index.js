
const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')
// crear el servidor

const app = express();

// conectar a la bbdd

conectarDB();


// habilitar cors

app.use(cors());

// Habilitar express.json

app.use(express.json({extended: true}))

// Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));


// Definir pagina principal

app.get('/', (req,res)=>{
    res.send('Hola Dieguiyo')
})

// Arrancar app
app.listen(PORT, ()=>{
    console.log(`El servidor esta funcionando , puerto ${PORT}`)
})



