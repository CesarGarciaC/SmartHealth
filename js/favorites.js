 
    function obtenerFavoritos()
    {
        alert("entrando a favoritos...")
        var data="id_user=1";
        
        $.ajax({        

            url: 'php/getFavorites.php',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
                alert(data)
                paintRecipes(3,data)
            } 
        });
    }
