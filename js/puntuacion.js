
    function reloadRating()
    {
        $(".basicNoEditable").jRating({

               length : 5, // nb of stars
               rateMax: 5,
               isDisabled: true,
               onSuccess : function(){
                 mostrarMensajeInformativo("La receta ha sido puntuada")
               }
         });

         $(".basicEditable").jRating({
               step:true,
               length : 5, // nb of stars
               rateMax: 5,
               onClick : function(element,rate){
                   voteWebService(rate)
               }
         });
     }
     
     reloadRating();
     
$(document).ready(function(){
         
         $("#btnPuntuacion").click(function()
         {
             if ($("#listadoPuntuacion").is(":visible"))
                $("#listadoPuntuacion").hide();
             else
                 $("#listadoPuntuacion").show();
         })
});

function voteWebService(rate)
         {
             if (User.id=="")
             {
                 $("#ratingUsuario").remove();
                 $("#recipeHeader").append("<div id='ratingUsuario' style='left:360px;top:30px' class='basicEditable' data-average='0'></div>");
                 mostrarMensajeError("Debe iniciar sesión para poder calificar esta receta.");

                 reloadRating();
                 return 0;
             }
             
             $("#listadoPuntuacion").hide();
                var id_user=User.id;
                var id_recipe=idReceta;
                var rating=rate;
                var data="id_user="+id_user+"&id_recipe="+id_recipe+"&rating="+rating;
                $.ajax({        

                    url: urlConexion+'?method=smartAddPointService&format=json&',                  //the script to call to get data          
                    data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                    dataType: 'json',                //data format    
                    async: true,
                    success: function(data)          //on recieve of reply
                    {
//                        alert("Receta puntuada");
                        seleccionarReceta(id_recipe);
                        mostrarMensajeInformativo("Receta puntuada")
                    } 
                });
         }
         
 function mostrarRatingDetallado(ratingUsuario,ratingPromedio,numVotos)
 {
     $("#puntuacionPromedio").html(ratingPromedio.toFixed(1));
     $("#numVotos").html(numVotos+" votos");
     $("#ratingUsuario").remove();
     
     if (ratingUsuario>0)
     {
        $("#recipeHeader").append("<div id='ratingUsuario' style='left:360px;top:30px' class='basicEditable' data-average='"+ratingUsuario+"'></div>")
        
     }
     else
     {
         $("#recipeHeader").append("<div id='ratingUsuario' style='left:360px;top:30px' class='basicEditable' data-average='0'></div>")
     }
         
//     else{
//        var id_user=User.id;
//        if(id_user!=""){
//        $("#btnPuntuacion").show();
//        }
//      }
      reloadRating();
 }


 function obtenerPuntuacion(id_recipe)
 {
	 
     var id_user=User.id;
//     alert(id_user+" - "+id_recipe)
     var data="id_user="+id_user+"&id_recipe="+id_recipe;
        $.ajax({        

            url: urlConexion+'?method=smartGetPointService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
//                alert("usuario:"+data.data.rating+" Promedio:"+(data.data.recipe_rating/data.data.recipe_raters))
                //No hay puntuacion
				var ratingGeneral=5;
				if(data.data.recipe_raters!=0)
					ratingGeneral=(data.data.recipe_rating/data.data.recipe_raters);
					
                mostrarRatingDetallado(data.data.rating,ratingGeneral,data.data.recipe_raters);

                if (data.data.code=="noResults")
                {
                    $("#btnPuntuacion").show();
                    return 1;
                }
                
                return (data.data.rating);
            } 
        });
 }
 
 function hackStars()
 {
     $(".jStar").css("background-image","url(js/icons/starsMenu.png)")
 }