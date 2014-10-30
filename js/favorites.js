 
    function obtenerFavoritos()
    {
        alert("entrando a favoritos...")
        var data="id_user_searchfav=1";
        
        $.ajax({        

            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartSearchFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {	
                var updatedData= {
			"recetas":data.data
		};
                
                /*RecipesGlobal.length=0;
		for(var i=0;i<updatedData.recetas.length;i++){
			RecipesGlobal.push(updatedData.recetas[i]);
			//alert(RecipesGlobal[i].name);
		}*/
		
                paintRecipes(3,updatedData)
            } 
        });
    }
