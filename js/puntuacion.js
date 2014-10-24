$(document).ready(function(){
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
         
         function voteWebService(rate)
         {
                var id_user="1";
                var id_recipe=$("#rating").attr("data-id");
                var rating=rate;
                var data="id_user="+id_user+"&id_recipe="+id_recipe+"&rating="+rating;
//                alert(id_recipe+" - "+rating)
                $.ajax({        

                    url: 'php/addRating.php',                  //the script to call to get data          
                    data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
                    dataType: 'json',                //data format    
                    async: false,
                    success: function(data)          //on recieve of reply
                    {
                        alert("Receta puntuada");
                    } 
                });
         }
});
