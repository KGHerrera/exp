const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');


// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'herrera', // Cambia esto por tu usuario de MySQL
    password: '12345', // Cambia esto por tu contraseña de MySQL (md)
    database: 'miapp' // Asegúrate de que esta base de datos exista
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL con el ID de conexión', connection.threadId);
});


// Middleware para procesar datos enviados por formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Ruta para servir el formulario de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


// Ruta para el home 
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Ruta para manejar el envío del formulario de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).send('Por favor completa todos los campos.');
    }

    // Verificar credenciales en la base de datos
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.execute(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error en el servidor.');
        }
        if (results.length === 0) {
            return res.status(401).send('Credenciales incorrectas. <a href="/login">Inténtalo de nuevo</a>');
        }

        // Simular inicio de sesión exitoso
        res.send(`¡Bienvenido, ${results[0].email}! Has iniciado sesión exitosamente.`);
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

