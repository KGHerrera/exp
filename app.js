const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para procesar datos enviados por formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Simulación de base de datos
const users = [
    { id: 1, email: 'user@example.com', password: 'password123' }, // Usuario de prueba
];

// Ruta para servir el formulario de login
app.get('/login', (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <!-- Añadir iconos de Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container d-flex align-items-center min-vh-100">
        <div class="row justify-content-center w-100">
            <div class="col-12 col-md-10 col-lg-7 col-xl-5">
                <div class="card shadow p-4 hover-effect">
                    <h2 class="text-center mb-4">Iniciar Sesión</h2>
                    <div class="text-center mb-4">
                        <h5>Bienvenido al Sistema de Tutorias</h5>
                    </div>
                    <form method="POST" action="/login">
                        <div class="mb-4 form-group form-floating">
                            <input type="email" class="form-control" id="email" name="email" placeholder="ejemplo@gmail.com" required>
                            <label for="email">
                                <i class="fas fa-envelope me-2"></i>
                                Correo Electrónico
                            </label>
                            <small class="form-text text-muted">Ejemplo: ejemplo@gmail.com</small>
                        </div>
                        <div class="mb-4 form-group form-floating">
                            <input type="password" class="form-control" id="password" name="password" placeholder="Mínimo 8 caracteres" required>
                            <label for="password">
                                <i class="fas fa-lock me-2"></i>
                                Contraseña
                            </label>
                            <small class="form-text text-muted">Mínimo 8 caracteres</small>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center hover-effect">
                            <i class="fas fa-sign-in-alt me-2"></i> Iniciar Sesión
                        </button>
                        <p class="text-center mt-4">
                            ¿No tienes cuenta? <a href="/register" class="text-decoration-none hover-effect">
                                Regístrate aquí <i class="fas fa-user-plus ms-1"></i>
                            </a>
                        </p>
                        <div class="d-flex align-items-center justify-content-center mb-4">
                            <i class="fas fa-shield-alt me-2 text-primary"></i>
                            <small class="text-muted">Tu inicio de sesión es seguro</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

  `);
});


// Ruta para el home 
app.get('/', (req, res) => { 
    res.send(` <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Home</title> <link href="/css/bootstrap.min.css" rel="stylesheet"> <!-- Añadir iconos de Font Awesome --> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> </head> <body> <header class="d-flex align-items-center justify-content-center text-center min-vh-100" style="background-color: #f8f9fa;"> <div> <h1>Bienvenido al Sistema</h1> <p>Integrando GitHub Actions, PM2 y EC2 AWS</p> <a href="/login" class="btn btn-primary"> <i class="fas fa-sign-in-alt me-2"></i> Ir a Login </a> </div> </header> </body> </html> `); });

// Ruta para manejar el envío del formulario de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).send('Por favor completa todos los campos.');
    }

    // Verificar credenciales
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).send('Credenciales incorrectas. <a href="/login">Inténtalo de nuevo</a>');
    }

    // Simular inicio de sesión exitoso
    res.send(`¡Bienvenido, ${user.email}! Has iniciado sesión exitosamente.`);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

