
// scroll en vista de detalle
var topIngredientes = 0;
var topInstrucciones = 0;
var step = 50;
var maxInstrucciones;

var audioElement;

  
$(document).ready($(function () {
    
    audioElement = document.createElement('audio');
    audioElement.addEventListener('ended', playCallback);
    
    
  /*$('.detalle-receta').mousedown(function(){
		  var id = $(this).attr("id").split("_")[1];
      getDetails(parseInt(id) + 2);
      idReceta=parseInt(id)+2;
    });*/
    
  
//  $('#favoritosBtn').click(function(){alert("dddddd")
//      if (User.id=="")
//      {
//            mostrarMensajeError("Debe iniciar sesión para poder agregar esta receta a sus favoritos.")
//            
//      }
//  }); 

  $('#volverBtn').click(function(){
  		$('#recipe-details').addClass("invisible-block"); 
      $('#data-container').removeClass("invisible-block"); 
      isInDetailView = false; 	
      $("#ratingUsuario").remove();
      $("#ratingPromedio").remove();
      
      $("#imgRatingUsuario").remove();
      $("#imgRatingPromedio").remove();
	  alert('holi');
	  actualizarVolver();
  });

  

  $('#videoBtn').hover(function () {       
        $("#recipePhoto").stop(true).animate({opacity: 0.5}, 100);
    },
    function(){
        $("#recipePhoto").stop(true).animate({opacity: 1}, 100);
  });

  $('#videoBtn').click(function(){
        activeView = "view_video";
        initView(activeView);
        var ytvideo;
        ytvideo = '<iframe width="854" height="510" src="http://www.youtube.com/embed/'+ $('#videoBtn').attr("ytVideoId") + '" frameborder="0" allowfullscreen></iframe>'

        $("#main-container").stop(true).animate({opacity: 0.8}, 100);
        $("#videolayer").fadeIn(200);
        $('#ytiframe').html(ytvideo);
  }); 

  $('#vl_closeBtn').click(function(){   
        $("#main-container").stop(true).animate({opacity: 1}, 100);
        $('#ytiframe').html('');
        $("#videolayer").fadeOut(100);
        activeView = "view_detalles";
        initView(activeView);
		
  }); 

  /* audio events */

  $('#voicePlayBtn').click(function(){
    currentIndex = 0;
    voicePlay();

  });

  $('#voiceStopBtn').click(function(){
    audioElement.pause();
    isPlaying = false;
    currentIndex = 0; 
  });

  $('#voiceBckBtn').click(function(){
    //console.log("antes" + currentIndex);
    currentIndex -= 2;
    //console.log("despues" + currentIndex);
    isPlaying = false;
    voicePlay();
  });

  $('#voiceFwdBtn').click(function(){
    isPlaying = false;
    voicePlay();
  });

  // Scroll

  $('.scroll-up-btn img').click(function(){
    if ($('#ingredientesTab').hasClass("tab-current")){
      var container = $("#ingredientsContainer");  
      if (topIngredientes - step > 0){
        topIngredientes = topIngredientes - step;
      }
      else{
        topIngredientes = 0;
      }
      
      container.animate({
        scrollTop: topIngredientes
      });
    }
    else{
      var container = $("#preparationDiv");
      if (topInstrucciones - step > 0){
        topInstrucciones = topInstrucciones - step;
      }
      else{
        topInstrucciones = 0;
      }
    
      container.animate({
        scrollTop: topInstrucciones
      });
    }
    
    
  });

  $('.scroll-down-btn img').click(function(){
    if ($('#ingredientesTab').hasClass("tab-current")){
      if (topIngredientes + step < $('#ingredientsContainer').prop('scrollHeight')){
        topIngredientes= topIngredientes + step;
      }
      else{
        topIngredientes = $('#ingredientsContainer').prop('scrollHeight');
      }
      
      $('#ingredientsContainer').animate({
        scrollTop: topIngredientes
      });
    }
    else{
      if (topInstrucciones + step < $("#preparationDiv").prop('scrollHeight')){
        topInstrucciones = topInstrucciones + step;
      }
      else{
        topInstrucciones = $("#preparationDiv").prop('scrollHeight');
      }
    
      $("#preparationDiv").animate({
        scrollTop: topInstrucciones
      });
    }
  });
})); 

  var currentInstructions;
  var currentIndex;
  var isPlaying = false;
  var queue;

  function voicePlay(){
    if (currentIndex >=0 && currentIndex < currentInstructions.length){
      queue = currentInstructions[currentIndex].split('.');
      currentIndex ++;
      isPlaying = true;
      GTvoicePlay();      
    }    
  }

  function selectRecipe(json,id_recipe){
  	getRelatedRecipes(json);

    fillRecipeDetails(json,id_recipe);
    $('#recipe-details').removeClass("invisible-block");
    $('#data-container').addClass("invisible-block");
	
    currentInstructions = json.instructions;
    currentIndex = 0;
    text = "";
    for (var i = 0; i < currentInstructions.length; i++) {
      text += currentInstructions[i];
    };
	
    //Iniciar carrusel abierto
	  try{
	    var elements=document.getElementsByClassName('slick-next');
	    elements[0].click();
	  }catch(ex){}

  }

 function fillRecipeDetails(details,id_recipe){
    if(details.name.length > 32){
      $('#recipeTitle').css('line-height','1.1');  
      $('#recipeTitle').html(details.name);  
    }
    else{
      $('#recipeTitle').css('line-height','50px');
      $('#recipeTitle').html(details.name);
    }
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
    var colCantidad;
    for (var i = 0; i < ingredientes.length; i++) {
      if(((ingredientes[i].quantity) %1)==0){
        colCantidad = ingredientes[i].quantity;
      }else{
        var f = new Fraction(ingredientes[i].quantity);
        colCantidad = f.numerator + '/' + f.denominator;
      }
      rowDisplay = '<tr> <td class="ingredientCell">' + ingredientes[i].name + '</td> <td class="umCell">' + 
      ingredientes[i].unit + '</td> <td class="quantityCell">' + colCantidad  + '</td> </tr>';
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
    maxInstrucciones = $('#preparationDiv').prop('scrollHeight');
    //alert($('#preparationDiv')[0].scrollHeight);

    // dificultad
    var difficulty = parseInt(details.difficulty);
    $('#dificultad_icons').empty();
    for (var i = 0; i < difficulty; i++) {
        $('#dificultad_icons').append('<li></li>');
    };

    // tiempo
    $('#duracion_text').html(details.time + " min"); 
    
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
                              ' kcal </th>        \
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
    
        url: urlConexion+'?method=smartSelectRecipeService&format=json&',                  //the script to call to get data          
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
  
  function agregarFavoritos(idRec)
  {
      try {
          var data="id_user="+User.id+"&id_recipe="+idReceta;

          $.ajax({        

            url: urlConexion+'?method=smartAddFavService&format=json&',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: true,
            success: function(response)          //on recieve of reply
            {
//               seleccionarReceta(idRec)
                $("#favoritosBtn").attr("onclick","eliminarFavoritosPreview(+"+idRec+")");
                $("#favoritosBtn").css("background-image","url('images/RemoveFavorites.png')");
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
      agregarFavoritos(0)
      busquedaTop10();
  }

  /* voice functions Google Translate */

  function GTvoicePlay(){
    if (queue.length > 0){
      var src = queue.shift();
      audioElement.setAttribute('src', 'http://translate.google.com/translate_tts?ie=utf-8&tl=es&q=' + encodeURIComponent(src));
      audioElement.play()  
    }
    else
      isPlaying = false;  
  }

  function playCallback(){
    if(isPlaying){
        if(queue.length > 0)
          GTvoicePlay();
        else
          voicePlay();
      }
  }
