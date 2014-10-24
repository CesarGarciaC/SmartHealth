 
    function obtenerFavoritos()
    {
        alert("entrando a favoritos...")
        var data="id_user_searchfav=1";
        
        $.ajax({        

            url: 'php/getFavorites.php',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
                json= JSON.parse(data);	
                var updatedData= {
			"recetas":json
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
