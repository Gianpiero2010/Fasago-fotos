<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <section id="loginContainer">
        <h2>Iniciar Sesión</h2>
        <input type="password" id="passwordInput" placeholder="Ingresa la contraseña" required>
        <button onclick="checkPassword()">Entrar</button>
        <p id="errorMsg"></p>
    </section>

    <script src="login.js"></script> <!-- Este script manejará la validación de la contraseña -->

</body>
</html>
