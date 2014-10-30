loginTest = TestCase("loginTest");

loginTest.prototype.setUp = function () {
/*:DOC += <form id="tabla" >

                <input id="user" placeholder="Nombre de usuario" type="text" >
                <input id="pass" placeholder="Contraseña" type="password" >


            </form>*/
};
//Test nombre de usuario y password vacio
loginTest.prototype.testValidateLoginFormBothEmpty = function () {
	
	/* Simulate empty user name and password */
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";	
	
  assertEquals("El nombre de usuario y la clave no pueden estar vacíos", InicioSesion());
	
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
	
  assertEquals("La clave no pueden estar vacía", InicioSesion());
	
};