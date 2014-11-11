var relatedRecipes=new Array();

function getRelatedRecipesCategory(category)
{	
    try
    {
		relatedRecipes= new Array();
        var data = 'id_category='+category;
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
				data.data.sort(function(a, b) {
                    return Math.random() - Math.random;
                });
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
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGeneralSearchService&format=json&', //the script to call to get data          
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

		
  						
		for(var i=0;i<recipe.categories.length;i++){
			
			getRelatedRecipesCategory(recipe.categories[i].id);
		}	
		
		distinctRecipes=relatedRecipes.unique();
		
		distinctRecipes.sort(function(a, b) {
                    return Math.random() - Math.random;
        });
		
		
		
		var targetdiv = $('#suggestionsContainer');
		var carruselSugeridas='<section class="slick-section blue"><div class="slick-content"><div class="slider center">';
		var factor=5;
		for(var i=0;i<distinctRecipes.length*factor;i++){

			//alert(relatedRecipes[i].name);
			//targetdiv.append('<div><h3><img src="data:image/jpg;base64,' + relatedRecipes[i%relatedRecipes.length].image + '"  width="170" height="170"/></h3></div>');
			carruselSugeridas+='<div><h3><img onclick="seleccionarReceta('+distinctRecipes[i%distinctRecipes.length].id+')" src="data:image/jpg;base64,' + distinctRecipes[i%distinctRecipes.length].image + '" height="150" height="150"/></h3></div>';//
			//$("#img_"+i).attr('src','data:image/jpg;base64,' + relatedRecipes[i%relatedRecipes.length].image + '');

			
			
		}

		carruselSugeridas+='</div></div></section>';
		//alert(carruselSugeridas);
		targetdiv.html(carruselSugeridas);
		
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


