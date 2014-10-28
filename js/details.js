 
 var idReceta;
 function seleccionarReceta(idRecetaSeleccionada){
		getDetails(parseInt(idRecetaSeleccionada));
		idReceta=parseInt(idRecetaSeleccionada);
		cancelarSeleccion(idRecetaSeleccionada);
		$('#receta_'+idRecetaSeleccionada).removeClass('detalle-receta-seleccionada');
 }

$(document).ready($(function () {
    
    
  /*$('.detalle-receta').mousedown(function(){
		  var id = $(this).attr("id").split("_")[1];
      getDetails(parseInt(id) + 2);
      idReceta=parseInt(id)+2;
    });*/

  $('#volverBtn').click(function(){
  		$('#recipe-details').addClass("invisible-block"); 
      $('#data-container').removeClass("invisible-block"); 
       		
  });

  $('#favoritosBtn').click(function(){
  	try {
            
          var data="id_user="+"1"+"&id_recipe="+idReceta;
          $.ajax({        

            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartAddFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(response)          //on recieve of reply
            {
              alert("Receta agregada a favoritos!!!")    
            } 
          });

        }catch(ex){
//          alert(ex.description)
        }
  });  

  $('#videoBtn').hover(function () {       
        $("#recipePhoto").stop(true).animate({opacity: 0.5}, 100);
    },
    function(){
        $("#recipePhoto").stop(true).animate({opacity: 1}, 100);
  });

  $('#videoBtn').click(function(){
        var ytvideo;
        ytvideo = '<iframe width="854" height="510" src="//www.youtube.com/embed/ZUwKaS06SpA" frameborder="0" allowfullscreen></iframe>'

        $("#main-container").stop(true).animate({opacity: 0.2}, 100);
        $("#videolayer").fadeIn(200);
        $('#ytiframe').html(ytvideo);
  }); 

  $('#vl_closeBtn').click(function(){        
        $("#main-container").stop(true).animate({opacity: 1}, 100);
        $('#ytiframe').html('');
        $("#videolayer").fadeOut(100);
  }); 

  $('#voicePlayBtn').click(function(){
    currentIndex = 0;
    /*if(isPlaying)
      voiceStop();
    else*/ 
      voicePlay();
  });

  $('#voiceStopBtn').click(function(){
    window.speechSynthesis.cancel();
    isPlaying = false;
    currentIndex = 0; 
  });

  $('#voiceBckBtn').click(function(){
    console.log("antes" + currentIndex);
    currentIndex -= 2;
    console.log("despues" + currentIndex);
    isPlaying = false;
    window.speechSynthesis.cancel();
    voicePlay();
  });

  $('#voiceFwdBtn').click(function(){
    isPlaying = false;
    window.speechSynthesis.cancel();
    voicePlay();
  });

  initUtterance();

  window.speechSynthesis.cancel();
})); 

  var utterance;

  var currentInstructions;
  var currentIndex;
  var isPlaying = false;
  var queue;

  function initUtterance(){
    utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'es-ES';

    utterance.onend = function() {
      if(isPlaying){
        if(queue.length > 0)
          msgPlay();
        else
          voicePlay();
      }
    };
  }

  function voicePlay(){
    if (currentIndex >=0 && currentIndex < currentInstructions.length){
      window.speechSynthesis.cancel();
      //console.log(currentIndex);
      queue = currentInstructions[currentIndex].split('.');
      currentIndex ++;
      isPlaying = true;
      msgPlay();      
    }    
  }

  function msgPlay(){
    if (queue.length > 0){
      utterance.text = queue.shift();
      window.speechSynthesis.speak(utterance);
    }
    else
      isPlaying = false;
  }

  /*function voiceStop(){
    if (isPlaying){
      window.speechSynthesis.stop();
      currentIndex--;
      isPlaying = false;
    }
  }*/

  function selectRecipe(json,id_recipe){
    //alert(recipeId);
	
    fillRecipeDetails(json,id_recipe);
    $('#recipe-details').removeClass("invisible-block");
    $('#data-container').addClass("invisible-block");

    currentInstructions = json.instructions;
    currentIndex = 0;
    text = "";
    for (var i = 0; i < currentInstructions.length; i++) {
      text += currentInstructions[i];
    };
  }

  function fillRecipeDetails(details,id_recipe){
    $('#recipeTitle').html(details.name);
    $("#rating").attr("data-id",id_recipe);
    //ingredientes
    var ingredientes = details.ingredients;
    var headerDisplay = '<tr>' +
                '<th>Ingrediente</th>' +
                            '<th>Unidad de Medida</th>' +      
                            '<th>Cantidad</th>' +
                        '</tr> '; 
    $('#ingredientsTable').empty();
    $('#ingredientsTable').append(headerDisplay);
    var rowDisplay;
    for (var i = 0; i < ingredientes.length; i++) {
      rowDisplay = '<tr> <td class="ingredientCell">' + ingredientes[i].name + '</td> <td class="umCell">' + 
      ingredientes[i].unit + '</td> <td class="quantityCell">' + ingredientes[i].quantity + '</td> </tr>';
      $('#ingredientsTable').append(rowDisplay);
    }
    
    //instrucciones
    var instrucciones = details.instructions;
    var pasosDisplay = "Instrucciones: <br/>";
    for (var i = 0; i < instrucciones.length; i++) {
      pasosDisplay += "<br/>" + (i + 1) + ". " + instrucciones[i] +" <br/>";
    }
    $('#preparationDiv').html(pasosDisplay);

    // dificultad
    var difficulty = parseInt(details.difficulty);
    $('#dificultad_icons').empty();
    for (var i = 0; i < difficulty; i++) {
        $('#dificultad_icons').append('<li></li>');
    };

    // tiempo
    $('#duracion').html("Tiempo de preparación: " + details.time + " minutos");
    
    // informacion nutricional
    var nutriDisplay = "Información nutricional: <br/>";
    nutriDisplay += "Calorías: " + details.calories + " kcal <br/>";
    nutriDisplay += "Colesterol: " + details.cholesterol + " g <br/>";
    nutriDisplay += "Fibra: " + details.fiber + " g <br/>";
    nutriDisplay += "Sodio: " + details.sodium + " g <br/>";
    nutriDisplay += "Carbohidratos: " + details.carbohydrate + " g <br/>";
    nutriDisplay += "Grasas: " + details.fat + " g <br/>";
    nutriDisplay += "Proteinas: " + details.proteins + " g <br/>";
    $('#infoNutricional').html(nutriDisplay);

    // imagen (provisional)
    var image = details.image;
    var imgDisplay= '<img id="recipeImag" src="data:image/jpg;base64, ' + image + '"/>';
    $('#recipePhoto').html(imgDisplay);

    // video
    var video = details.video;
    video = "https://www.youtube.com/watch?v=s65gsW5C_ZU";
    if(video != ""){

    }
  } 

  function getDetails(id_recipe) {
    try {
  
      var data="id_recipe=" + id_recipe;

      //-----------------------------------------------------------------------
      // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
      //-----------------------------------------------------------------------
      $.ajax({        
    
        url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartSelectRecipeService&format=json&',                  //the script to call to get data          
        data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
        dataType: 'json',                //data format    
        async: false,
        success: function(response)          //on recieve of reply
        {

          selectRecipe(response.data,id_recipe);        
        } 
      });
    
    }catch(ex){
      alert(ex.description)
    }
  }
