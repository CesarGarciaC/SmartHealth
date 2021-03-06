
function loginUser(user) {

    if ((user.code) == "badLoginInformation") {
        mostrarMensajeError(user.message);
        return user.message;
    }
    else {

        activeView = "view_top10";
        initView(activeView);
		
        parent.document.getElementById('usuarioLogin').innerHTML = "";

        parent.document.getElementById('iniSesion').innerHTML = "<img src=images/user.png >" + user.user_nicename;
        parent.document.getElementById('menuFavoritos').setAttribute('onclick', 'obtenerFavoritos()');

        parent.document.getElementById('usuarioLogout').innerHTML = "Cerrar Sesi&oacuten";
        parent.document.getElementById('usuarioLogout').css = "border: 1px solid black;";
        parent.userLogin(user.ID, user.user_nicename, user.user_email);
        parent.closeIframe();
        return "Bienvenido"+user.user_nicename;
    }
}

function InicioSesion()
{
    try
    {
        var user = (document.getElementById("user")).value;
        var password = (document.getElementById("pass")).value;
		
        var data = "";
		var app='smarttv';
        //Comprobar que el usuario y la contraseña no sean nulas
        if (user != "" && password != "") {
            data = {
                username: user,
                password: password,
				app:app,
            }
			
			

            //-----------------------------------------------------------------------
            // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
            //-----------------------------------------------------------------------
            var url = urlConexion+ 
                        '?method=loginService&format=json&'; 
            $.ajax({
                url: url, //the script to call to get data          
                data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                dataType: 'json', //data format    
                async: false,
                success: function(data)          //on recieve of reply
                {

                    loginUser(data.data);
                },
                error: function() {
					mostrarMensajeError("Error con el servidor");
                }
            });
        }
        else if (user == "" && password == "") {
            mostrarMensajeError("El nombre de usuario y la contraseña no pueden estar vacíos");
            return "El nombre de usuario y la contraseña no pueden estar vacíos";
        }
        else if (user == "") {
            mostrarMensajeError("El nombre de usuario no pueden estar vacío");
            return "El nombre de usuario no pueden estar vacío";
        }
        else if (password == "")
            mostrarMensajeError("La contraseña no pueden estar vacía");
        return "La contraseña no pueden estar vacía";

    } catch (ex) {
        alert(ex.description)
    }
}

