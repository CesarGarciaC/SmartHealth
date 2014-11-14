var relatedRecipes=new Array();

function getRelatedRecipesCategory(category)
{	
    try
    {
		
        var data = 'id_category='+category;
        $.ajax({
            url: urlConexion+'?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
				for(var i=0;i<data.data.length;i++){
					relatedRecipes.push(data.data[i]);
				}				
            }
        });

    } catch (ex) {
        alert(ex.description)
    }
}
function getRelatedRecipesKeyword(keyword)
{	
    try
    {
		
        var data = 'keyword='+keyword;
        $.ajax({
            url: urlConexion+'?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

				for(var i=0;i<data.data.length;i++){
					relatedRecipes.push(data.data[i]);
				}				
            }
        });

    } catch (ex) {
        alert(ex.description)
    }
}

//Distintos

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i].id === v) return true;
    }
    return false;
};
 
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i].id)) {
            arr.push(this[i]);
        }
    }
    return arr;
}


function getRelatedRecipes(recipe){


		relatedRecipes= new Array();


		var keywordsRecipe=recipe.keyword.split(",");
				
		for(var i=0;i<keywordsRecipe.length;i++){			
			getRelatedRecipesKeyword(keywordsRecipe[i]);
		}	

		for(var i=0;i<recipe.categories.length;i++){
			if(relatedRecipes.length<7){
				getRelatedRecipesCategory(recipe.categories[i].id);
			}
			else	break;
		}
		
		distinctRecipes=relatedRecipes.unique();
		
		distinctRecipes.sort(function(a, b) {
                    return Math.random() - Math.random;
        });
		
		
		var targetdiv = $('#suggestionsContainer');
		var carruselSugeridas='<section class="slick-section blue"><div class="slick-content"><div class="slider center">';
		var factor=5;
		if(distinctRecipes>5)	factor=1;
		for(var i=0;i<distinctRecipes.length*factor;i++){

			//alert(relatedRecipes[i].name);
			//targetdiv.append('<div><h3><img src="data:image/jpg;base64,' + relatedRecipes[i%relatedRecipes.length].image + '"  width="170" height="170"/></h3></div>');
			carruselSugeridas+='<div id="sugeridas_'+i+'"><h3 style="float:left;"><img onclick="seleccionarReceta('+distinctRecipes[i%distinctRecipes.length].id+')" src="data:image/jpg;base64,' + distinctRecipes[i%distinctRecipes.length].image + '" height="150" height="150"/></h3></div>';//
			//$("#img_"+i).attr('src','data:image/jpg;base64,' + relatedRecipes[i%relatedRecipes.length].image + '');			
			
		}

		carruselSugeridas+='</div></div></section>';
		//alert(carruselSugeridas);
		targetdiv.html(carruselSugeridas);
		
		for(var i=0;i<distinctRecipes.length*factor;i++){
			$('#sugeridas_'+i).mouseover(function(){
				var id=$(this).attr("id").split("_")[1];
				mostrarDetallesSugeridas($(this).attr("id"),distinctRecipes[id%distinctRecipes.length].name);
			});
			$('#sugeridas_'+i).mouseout(function(){
				desvanecerDetallesSugeridas($(this).attr("id"));
			});
			
		}	
		
$('.center').slick({
  centerMode: true,
  centerPadding: '35px',
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
			        
}

var selected_carrusel_id='';

function mostrarDetallesSugeridas(elemId, name){
	
	if(selected_carrusel_id!=elemId){
	try{
		var mainDiv = document.getElementById(selected_carrusel_id);
		var deleteDiv = document.getElementById('detail_'+selected_carrusel_id);
		mainDiv.removeChild(deleteDiv);
	}
	catch(ex){
	}
	
	selected_carrusel_id=elemId;
	var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'detail_' + elemId);
    newdiv.setAttribute('class', 'detalle-sugeridas');	
	document.getElementById(elemId).appendChild(newdiv);
	
	$('#detail_'+elemId).html('<p>'+name+'</p>');
	
	$('#detail_'+elemId).mouseout(function(){
				selected_carrusel_id=elemId='';
	});
	}
	
}

function desvanecerDetallesSugeridas(elemId){

	if(selected_carrusel_id!=elemId){
	var mainDiv = document.getElementById(elemId);
	var deleteDiv = document.getElementById('detail_'+elemId);
	try{		
		mainDiv.removeChild(deleteDiv);
	}catch(ex){}
	
	}

	
	
}


