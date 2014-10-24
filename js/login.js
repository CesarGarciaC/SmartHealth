//Variable global

var User = "";

//Objeto Usuario
function UserData(nicename, email, favouritesRecipes) {
    this.nicename = nicename;
    this.email = email;
    this.favoutitesRecipes = favouritesRecipes;
}

function loginUser(user) {
	alert(user.user_login);
    if (user.user_login !== null) {
        User = new UserData(user.user_nicename, user.user_email);
        alert("Bienvenido " + User.nicename);       
    }
}

function InicioSesion()
{
    try
    {
        var user=(document.getElementById("user")).value;
        var password=(document.getElementById("pass")).value;

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
                url: 'php/loginService.php', //the script to call to get data          
                data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                dataType: 'json', //data format    
                async: false,
                success: function(data)          //on recieve of reply
                {
					
                    json = JSON.parse(data);
                    loginUser(json.data);
                    location.href="index.html";
                }
            });         
        }
        else if(user == ""&&password == ""){
            alert("El nombre de usuario y la contraseña no pueden estar vacíos");
            return "El nombre de usuario y la contraseña no pueden estar vacíos";
        }
        else if(user == ""){
            alert("El nombre de usuario no pueden estar vacío");
            return "El nombre de usuario no pueden estar vacío";}
        else if(password == "")
            alert("La contraseña no pueden estar vacía");
            return "La contraseña no pueden estar vacía";
        
    } catch (ex) {
        alert(ex.description)
    }
}

