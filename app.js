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
    password: '12345', // Cambia esto por tu contraseña de MySQL
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

// Ruta para servir el formulario de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Ruta para servir el dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
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

        // Redirigir al dashboard
        res.redirect('/dashboard');
    });
});



// Ruta para manejar el envío del formulario de registro
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).send('Por favor completa todos los campos.');
    }

    // Insertar nuevo usuario en la base de datos
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    connection.execute(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error al registrar al usuario.');
        }

        // Redirigir a la página de login después de registrar al usuario
        res.send('¡Registro exitoso! <a href="/login">Inicia sesión aquí</a>');
    });
});




// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

