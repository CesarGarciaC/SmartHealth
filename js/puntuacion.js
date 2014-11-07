
    function reloadRating()
    {
        $(".basicNoEditable").jRating({

               length : 5, // nb of stars
               rateMax: 5,
               isDisabled: true,
               onSuccess : function(){
                 alert('Success : your rate has been saved :)');
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
             $("#listadoPuntuacion").hide();
                var id_user=User.id;
                var id_recipe=idReceta;
                //alert(id_recipe)
                var rating=rate;
                var data="id_user="+id_user+"&id_recipe="+id_recipe+"&rating="+rating;
//                alert(id_recipe+" - "+rating)
                $.ajax({        

                    url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartAddPointService&format=json&',                  //the script to call to get data          
                    data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                    dataType: 'json',                //data format    
                    async: false,
                    success: function(data)          //on recieve of reply
                    {
//                        alert("Receta puntuada");
                        mostrarMensajeInformativo("Receta puntuada")
                    } 
                });
         }
         
 function mostrarRatingDetallado(ratingUsuario,ratingPromedio)
 {
     if (ratingUsuario>0)
     {
        alert("Receta ya calificada")
        $("#recipeHeader").append("<img id='imgRatingUsuario' style='position:absolute;left:690px;top:0px' src='images/user_one.png' />")
        $("#recipeHeader").append("<div id='ratingUsuario' style='left:330px;top:0px' class='basicNoEditable' data-average='"+ratingUsuario+"'></div>")
        
        $("#recipeHeader").append("<img id='imgRatingPromedio' style='position:absolute;left:690px' src='images/user_much.png' />")
        $("#recipeHeader").append("<div id='ratingPromedio' style='position:absolute!important;left:730px;margin-top:10px' class='basicNoEditable' data-average='"+ratingPromedio+"'></div>")
        reloadRating();
        $("#btnPuntuacion").hide();
     }
 }


 function obtenerPuntuacion(id_recipe)
 {
     var id_user=User.id;
     var data="id_user="+id_user+"&id_recipe="+id_recipe;
        $.ajax({        

            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGetPointService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
//                alert("usuario:"+data.data.rating+" Promedio:"+(data.data.recipe_rating/data.data.recipe_raters))
                mostrarRatingDetallado(data.data.rating,(data.data.recipe_rating/data.data.recipe_raters))
                return (data.data.rating);
            } 
        });
 }