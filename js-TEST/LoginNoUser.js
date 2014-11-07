login2Test = TestCase("login2Test");

login2Test.prototype.setUp = function () {
/*:DOC += <form id="tabla" >

                <input id="user" placeholder="Nombre de usuario" type="text" >
                <input id="pass" placeholder="Contraseña" type="password" >


            </form>*/
};
//Test nombre de usuario y password vacio
login2Test.prototype.testValidateLogin2 = function () {
	
	/* Simulate empty user name and password */
	document.getElementById("user").value = "admin";
	document.getElementById("pass").value = "ghhjg";	
	
  assertEquals("Usuario o contraseña no valido", InicioSesion());
	
};
