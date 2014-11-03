
function loginUser(user) {
    if ((user.code) == "badLoginInformation") {
        alert(user.message);
    }
    else {
        alert("Bienvenido " + user.user_nicename);
        parent.document.getElementById('usuarioLogin').innerHTML="";
        parent.document.getElementById('iniSesion').innerHTML="<img src=images/user.png >"+user.user_nicename;
        parent.document.getElementById('usuarioLogout').innerHTML="Cerrar Sesión";
        parent.userLogin(user.ID,user.user_nicename,user.user_email);
        parent.closeIframe();
    }
}

function InicioSesion()
{
    try
    {
        var user = (document.getElementById("user")).value;
        var password = (document.getElementById("pass")).value;

        var data = "";
        //Comprobar que el usuario y la contraseña no sean nulas
        if (user != "" && password != "") {
            data = {
                username: user,
                password: password, 
            }

            //-----------------------------------------------------------------------
            // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
            //-----------------------------------------------------------------------
            $.ajax({
                url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=loginService&format=json&', //the script to call to get data          
                data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                dataType: 'json', //data format    
                async: false,
                success: function(data)          //on recieve of reply
                {

                    loginUser(data.data);
                }
            });
        }
        else if (user == "" && password == "") {
            alert("El nombre de usuario y la clave no pueden estar vacíos");
            return "El nombre de usuario y la clave no pueden estar vacíos";
        }
        else if (user == "") {
            alert("El nombre de usuario no pueden estar vacío");
            return "El nombre de usuario no pueden estar vacío";
        }
        else if (password == "")
            alert("La clave no pueden estar vacía");
        return "La clave no pueden estar vacía";

    } catch (ex) {
        alert(ex.description)
    }
}

