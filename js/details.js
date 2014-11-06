
$(document).ready($(function () {
    
    
  /*$('.detalle-receta').mousedown(function(){
		  var id = $(this).attr("id").split("_")[1];
      getDetails(parseInt(id) + 2);
      idReceta=parseInt(id)+2;
    });*/

  $('#volverBtn').click(function(){
  		$('#recipe-details').addClass("invisible-block"); 
      $('#data-container').removeClass("invisible-block"); 
      isInDetailView = false; 		
  });

  

  $('#videoBtn').hover(function () {       
        $("#recipePhoto").stop(true).animate({opacity: 0.5}, 100);
    },
    function(){
        $("#recipePhoto").stop(true).animate({opacity: 1}, 100);
  });

  $('#videoBtn').click(function(){
        var ytvideo;
        ytvideo = '<iframe width="854" height="510" src="http://www.youtube.com/embed/'+ $('#videoBtn').attr("ytVideoId") + '" frameborder="0" allowfullscreen></iframe>'

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

  //Carrusel
  $('.center').slick({
    centerMode: true,
    centerPadding: '225px',
    slidesToShow: 3,  
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
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
    //var pasosDisplay = "Instrucciones: <br/>";
    var pasosDisplay = "";
    for (var i = 0; i < instrucciones.length; i++) {
      pasosDisplay += (i + 1) + ". " + instrucciones[i] +" <br/><br/>";
    }
    $('#preparationDiv').html(pasosDisplay);

    // dificultad
    var difficulty = parseInt(details.difficulty);
    $('#dificultad_icons').empty();
    for (var i = 0; i < difficulty; i++) {
        $('#dificultad_icons').append('<li></li>');
    };

    // tiempo
    $('#duracion').html("Tiempo: " + details.time + " min");
    
    // informacion nutricional
    var nutriTable = '<section class="performance-facts"> \
                        <header class="performance-facts__header"> \
                          <h1 class="performance-facts__title">Información nutricional</h1> \
                        </header> \
                        <table class="performance-facts__table"> \
                          <thead> \
                            <tr> \
                              <th colspan="3" class="small-info"> \
                              </th> \
                            </tr> \
                          </thead> \
                          <tbody> \
                            <tr> \
                              <th colspan="2"> \
                                <b>Calorías</b> ' + details.calories +
                              ' gr </th>        \
                            </tr> \
                            <tr class="thick-row"> \
                              <td colspan="3" class="small-info"> \
                                <b>% Daily Value*</b> \
                              </td> \
                            </tr> \
                            <tr> \
                              <th colspan="2"> \
                                <b>Grasas</b> ' + details.fat +
                              ' gr </th> \
                              <td> \
                                <b>' + Math.round(details.fat / 65 * 100)+ '% </b> \
                              </td> </tr> <tr> \
                              <th colspan="2">\
                                <b>Colesterol</b> ' + details.cholesterol +
                              ' gr </th> \
                              <td> \
                                <b>' + Math.round(details.cholesterol / 0.3 * 100)+ '% </b> \
                              </td> \
                            </tr> \
                            <tr> \
                              <th colspan="2"> \
                                <b>Sodio</b> ' + details.sodium +
                              ' gr </th> \
                              <td> \
                                <b>' + Math.round(details.sodium / 2.4 * 100)+ '% </b> \
                              </td> \
                            </tr> \
                            <tr> \
                              <th colspan="2"> \
                                <b>Carbohidratos</b> ' + details.carbohydrate + 
                              ' gr </th> \
                              <td> \
                                <b>' + Math.round(details.carbohydrate / 300 * 100)+ '% </b> \
                              </td> \
                            </tr> \
                            <tr> \
                              <td class="blank-cell"> \
                              </td> \
                              <th>Fibra ' + details.fiber + 
                              ' gr </th> \
                              <td> \
                                <b>' + Math.round(details.fiber / 25 * 100)+ '% </b> \
                              </td> \
                            </tr> \
                            <tr class="thick-end"> \
                              <th colspan="2"> \
                                <b>Proteina</b> ' + details.proteins +
                              ' gr </th> \
                              <td> \
                              </td> \
                            </tr> \
                          </tbody> \
                        </table> </section>';

    /*var nutriDisplay = "Información nutricional: <br/>";
    nutriDisplay += "Calorías: " + details.calories + " kcal <br/>";
    nutriDisplay += "Colesterol: " + details.cholesterol + " g <br/>";
    nutriDisplay += "Fibra: " + details.fiber + " g <br/>";
    nutriDisplay += "Sodio: " + details.sodium + " g <br/>";
    nutriDisplay += "Carbohidratos: " + details.carbohydrate + " g <br/>";
    nutriDisplay += "Grasas: " + details.fat + " g <br/>";
    nutriDisplay += "Proteinas: " + details.proteins + " g <br/>";*/
    $('#infoNutricional').html(nutriTable);

    // imagen (provisional)
    var image = details.image;
    var imgDisplay= '<img id="recipeImag" src="data:image/jpg;base64, ' + image + '"/>';
    $('#recipePhoto').html(imgDisplay);

    // video
    var video = details.video;
    //video = "https://www.youtube.com/watch?v=s65gsW5C_ZU";
    if(video == ""){
      $('#videoBtn').addClass("invisible-block"); 
      $('#videoBtn').removeClass("visible-block"); 
    }
    else{
      $('#videoBtn').removeClass("invisible-block"); 
      $('#videoBtn').addClass("visible-block"); 
      $('#videoBtn').attr("ytVideoId",video);
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
  
  $('#favoritosBtn').click(function(){
  	agregarFavoritos();
  });  
  
  
  
  function agregarFavoritos()
  {
      try {
//            alert(User.id)
          var data="id_user="+User.id+"&id_recipe="+idReceta;
          $.ajax({        

            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartAddFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(response)          //on recieve of reply
            {
                mostrarMensajeInformativo("Receta agregada a favoritos");
            } 
          });

        }catch(ex){
//          alert(ex.description)
        }
  }
  
  function agregarFavoritosPreview(idRecipe)
  {
      idReceta=idRecipe;
      //alert(idReceta)
      agregarFavoritos()
  }
