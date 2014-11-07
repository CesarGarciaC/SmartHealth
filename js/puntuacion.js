
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
//         alert(ratingUsuario+"-"+ratingPromedio)
        $("#topContainer").append("<div id='ratingUsuario' style='left:200px;top:20px' class='basicNoEditable' data-average='"+ratingUsuario+"'></div>")
        $("#topContainer").append("<div id='ratingPromedio' style='left:450px' class='basicNoEditable' data-average='"+ratingPromedio+"'></div>")
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