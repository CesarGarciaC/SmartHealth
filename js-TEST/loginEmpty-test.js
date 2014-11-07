loginTest = TestCase("loginTest");

loginTest.prototype.setUp = function () {
/*:DOC += 
    <head>
        
        <link href="css/keyboardLogin.css" rel="stylesheet"/>
        <meta charset="UTF-8">
        
    </head>


    <body>

        <div class="login-card">
            <h1 style="margin-bottom: 0px;">Iniciar Sesión</h1>
            <b style="position: relative;padding-left: 230px;padding-bottom: 20px;">PUCP</b><br>


            <form id="tabla" >

                <input id="user" placeholder="Nombre de usuario" type="text" >
                <input id="pass" placeholder="Contraseña" type="password" >


            </form>


            <input type="submit" name="login" class="login login-submit" value="Acceder" onclick="InicioSesion()">

            <a id="lostPassword" onclick="mostrarMensajeError('Para restaurar tu contraseña accede a http://200.16.7.111/wordpress/ ');">¿Has olvidado la contraseña?</a><a id="noUSer" onclick="mostrarMensajeError('Si no cuenta con un usuario PUCP, registrese en http://200.16.7.111/wordpress/');" style="padding-left:15px;">Registrarse</a>



        </div>



    </body>
*/
};
//Test nombre de usuario y password vacio
loginTest.prototype.testValidateLoginFormBothEmpty = function () {
	
	/* Simulate empty user name and password */
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";	
	
  assertEquals("El nombre de usuario y la contraseña no pueden estar vacíos", InicioSesion());
	
};

loginTest.prototype.testValidateLoginFormUserEmpty = function () {
	
	/* Simulate empty user name */
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "admin";	
	
  assertEquals("El nombre de usuario no pueden estar vacío", InicioSesion());
	
};

loginTest.prototype.testValidateLoginFormPassEmpty = function () {
	
	/* Simulate empty  password */
	document.getElementById("user").value = "admin";
	document.getElementById("pass").value = "";	
	
  assertEquals("La contraseña no pueden estar vacía", InicioSesion());
	
};