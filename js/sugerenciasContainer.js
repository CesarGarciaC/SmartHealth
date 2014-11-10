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

function getRelatedRecipes(recipe){
		
		
		
		for(var i=0;i<recipe.categories.length;i++){
			getRelatedRecipesCategory(recipe.categories[i].id);
		}	
		
		relatedRecipes.sort(function(a, b) {
                    return Math.random() - Math.random;
        });
		
		var targetdiv = $('#slider_sugeridas');
		var carruselSugeridas='';//<div class="slick-content"> <div class="slider center">';//<section class="slick-section blue"><div class="slick-content"><div class="slider center">';
		for(var i=0;i<relatedRecipes.length;i++){
			//alert(relatedRecipes[i].name);
			carruselSugeridas+='<div><h3><img src="data:image/jpg;base64,' + relatedRecipes[i].image + '"  width="170" height="170"/></h3></div>';//
		}
		carruselSugeridas+='';//</div></div>';//</div></div></section>';
		//alert(carruselSugeridas);
		//targetdiv.html(carruselSugeridas);
                      
}


