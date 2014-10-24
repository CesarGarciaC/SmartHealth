$(document).ready($(function () {
    
    var idReceta;
  $('.detalle-receta').mousedown(function(){
		  var id = $(this).attr("id").split("_")[1];
      getDetails(parseInt(id) + 2);
      idReceta=parseInt(id)+2;
    });

  $('#volverBtn').click(function(){
  		$('#recipe-details').addClass("invisible-block");  		
  });

  $('#favoritosBtn').click(function(){
  	try {
            alert("Receta: "+idReceta);
          var data="id_user="+"1"+"&id_recipe="+idReceta;
          $.ajax({        

            url: 'php/addFavorites.php',                  //the script to call to get data          
            data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json',                //data format    
            async: false,
            success: function(response)          //on recieve of reply
            {
              alert("Receta agregada a favoritos!!!")    
            } 
          });

        }catch(ex){
          alert(ex.description)
        }
  });  

  $('#voicePlayBtn').click(function(){
    	var audio = new Audio();
      var playText = text.substring(0,99);
      audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=es&q=' + encodeURI(playText);
      audio.play();
    	/*for (var i = 0; i <= text.length / 100;i++) {
    		playText = text.substring(i*100,i*100+99);
    		alert(playText);
    		audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=es&q=' + encodeURI("hola" + i);
			audio.play();
			sleep(2000,alert());
    	};*/
  });

})); 

  var selectedRecipe;
  var currentInstructions;

  function selectRecipe(json){
    //alert(recipeId);
    fillRecipeDetails(json[0]);
    $('#recipe-details').removeClass("invisible-block");
    
    currentInstructions = json[0].instructions;
    text = "";
    for (var i = 0; i < currentInstructions.length; i++) {
      text += currentInstructions[i];
    };

    /*var soapMessage =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sexy="http://www.dreamsolutions.com/sexy_service/">' +
      '<soapenv:Header/>' +
        '<soapenv:Body>' +
            '<sexy:id_recipe>3</sexy:id_recipe>' +
        '</soapenv:Body>' +
  '</soapenv:Envelope>';

    $.ajax({
      url: "http://200.16.7.111/wordpress/index.php?/wpws/?wsdl",
      type: "POST",
      contentType: 'text/xml; charset=utf-8',
      headers: {
          SOAPAction: "http://www.dreamsolutions.com/sexy_service/smartSelectRecipeService"
      },
      data: soapMessage,
      success: function(soapResponse){
          //DO SOMETHING
          alert("OK");
          //alert(soapResponse);
        }
        //error: alert("error")
        
    });
  

  /*$.soap({
      url: 'http://200.16.7.111/wordpress/index.php?/wpws/?wsdl',
      method: 'http://www.dreamsolutions.com/sexy_service/smartSelectRecipeService',
      data: {
          id_recipe: '2'
      },
      success: function (soapResponse) {
        alert(soapResponse);
        // do stuff with soapResponse
      },
      error: function (soapResponse) {
          alert('that other server might be down...');
      }
  });*/
    //alert("end");
  }

  function fillRecipeDetails(details){
    $('#recipeTitle').html(details.name);
    
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
    $('#dificultad').html("Dificultad: " + details.difficulty);
    
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
  } 

  function getDetails(id_recipe) {
    try {
  
      var data="id_recipe=" + id_recipe;

      //-----------------------------------------------------------------------
      // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
      //-----------------------------------------------------------------------
      $.ajax({        
    
        url: 'php/selectRecipe.php',                  //the script to call to get data          
        data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
        dataType: 'json',                //data format    
        async: false,
        success: function(response)          //on recieve of reply
        {
          json= JSON.parse(response); 
          selectRecipe(json);        
        } 
      });
    
    }catch(ex){
      alert(ex.description)
    }
  }