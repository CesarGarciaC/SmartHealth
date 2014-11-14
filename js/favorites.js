 $(document).ready($(function()
 {  
    $(".menu-option").click(function()
    {
        if ($(this).html().indexOf("Favoritos")>=0)
        {
            isInFavoriteView=true;
        }
        else
            isInFavoriteView=false;
    })
 }));
 
    function obtenerFavoritos()
    {   if(User.id!=""){
        mostrarLoading();
        isInFavoriteView=true;
		$("#search-advanced").hide();
		$("#categorias-menu").hide();
		$(".resultado-recetas").css("width","95%");
		$(".resultado-recetas").css("height","70%");
		$(".resultado-recetas").css("left","20px");
		
        var data="id_user="+User.id;
        
        $.ajax({        

            url: urlConexion+'?method=smartSearchFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {	
                removerLoading();
                var updatedData= {
			"recetas":data.data
		};
                
                /*RecipesGlobal.length=0;
		for(var i=0;i<updatedData.recetas.length;i++){
			RecipesGlobal.push(updatedData.recetas[i]);
			//alert(RecipesGlobal[i].name);
		}*/
		        activeView = "view_favoritos";
                paintRecipes(3,updatedData);
                return updatedData;
            } 
        });
    }else
        mostrarMensajeInformativo("Es necesario iniciar sesión para acceder a favoritos");}
    
    function obtenerListaFavoritos()
    {
        var data="id_user="+User.id;
        
        var resp=$.ajax({        

            url: urlConexion+'?method=smartSearchFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {	
                removerLoading();
                var updatedData= {
			"recetas":data.data
		};
                return updatedData;
            } 
        });
        
//        alert(resp.responseText)
        var r=resp.responseText.replace(/\+/g," ");
        var r2=unescape(r)
//        alert(r2)
        return resp.responseText;
    }
    
    function eliminarFavoritosPreview(id_recipe)
    {
       var data="id_user="+User.id+"&id_recipe="+id_recipe; 
       $.ajax({        

            url: urlConexion+'?method=smartDeleteFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: true,
            success: function(data)          //on recieve of reply
            {	
//                obtenerFavoritos();
//                seleccionarReceta(id_recipe);
                mostrarMensajeInformativo("Receta eliminada de tus favoritos.")
                $("#favoritosBtn").css("background-image","url('css/images/AddFavorites.png')");
                $("#favoritosBtn").attr("onclick","agregarFavoritos("+id_recipe+")");
            } 
        }); 
    }
    
    
    
    function isInFavorites(idReceta)
    {
        var flagFavorites;
        var data="id_recipe="+idReceta+"&id_user="+User.id; 
       var resp=$.ajax({        

            url: urlConexion+'?method=smartIsFavorite&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {	
                flagFavorites=data.data.isFavorite;
            } 
        }); 
        return flagFavorites;
    }
