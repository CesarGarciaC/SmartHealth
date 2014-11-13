/*

ActiveView:
- "view_login"
- "view_top10"
- "view_recientes"
- "view_favoritos"
- "view_categorias"
- "view_busqueda"
- "view_detalles"
- "view_video"
- "view_keyboard"

Active Element Type:
- "results"
- "categories"
- "leftMenu"
- "searchKeyboard"
- "detailsView"
- "loginForm"
- "detailsView_Header"
- "detailsView_Ingredients"
- "detailsView_Instructions"
- "detailsView_Photo"
- "detailsView_Suggestions"
- "favorite"

*/

function initView(view){
	if(view == "view_top10"){
		cleanNavigation();
		//cleanSelection();
		$("#menu1").addClass("selected");
    	$("#menu1").addClass("keynav");
	}
	else if(view == "view_recientes"){
		
	}
	else if(view == "view_favoritos"){
		
	}
	else if(view == "view_login"){
		cleanNavigation();
		//cleanSelection();
		$("#user").addClass("keynav");	
	}
	else if(view == "view_categorias"){
		
	}
	else if(view == "view_busqueda"){
		
	}
	else if(view == "view_detalles"){
		cleanNavigation();
		activeElementType = "photo";
		activeElement = "recipeImag";
		addNavigation();
	}
	else if(view == "view_video"){
		
	}

}

function navigateTop10(keyCode){
	if(keyCode == 37){ // left
    	if(activeElementType == "results"){
        	if(activeElementIndex % columns == 0){
            	activeElementType = "leftMenu";
                activeElement = leftMenuElements[1];
                activeElementIndex = 1;
            }
            else{
 				activeElementIndex --;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
    	}
    	else if(activeElementType == "leftMenu"){
    	}
    	else if (activeElementType == "searchKeyboard"){
    		activeElementType = "leftMenu";
            activeElement = leftMenuElements[1];
            activeElementIndex = 1;
    	}
	}
    else if(keyCode == 38){ // up
    	if (activeElementType == "results"){
            var activeId = activeElementIndex - columns;
            if(activeId >= 0){
            	activeElementIndex -= columns;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                        
            }
            else{
            	//$("#keyboard").getkeyboard().reveal(); 
                activeElement = "keyboard";
                activeElementType = "searchKeyboard";
            }
        }
        else if(activeElementType == "leftMenu"){
        	if(activeElementIndex > 0){
            	activeElementIndex--;
                activeElement = leftMenuElements[activeElementIndex];
            }
        }
        else if (activeElementType == "searchKeyboard"){    		
    	}
    }
    else if(keyCode == 39){ // right
    	if(activeElementType == "results"){
            if(activeElementIndex < totalResults - 1){
            	activeElementIndex ++;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
        }    
        else if(activeElementType == "leftMenu"){
            activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
        }
        else if (activeElementType == "searchKeyboard"){
    	}
    }
    else if(keyCode == 40){ // down
    	if (activeElementType == "results"){
            var activeId = activeElementIndex + columns;
            if(activeId < totalResults){
            	activeElementIndex += columns;
                activeElement = "receta_" + activeElementIndex;

                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                    
            }
        }    
        else if(activeElementType == "leftMenu"){
            if(activeElementIndex < leftMenuElements.length - 1){
            	activeElementIndex++;
            	activeElement = leftMenuElements[activeElementIndex];                    
            }                                
        }
        else if (activeElementType == "searchKeyboard"){
    		activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
    	}
    }
}

function navigateCategories(keyCode){
	if(keyCode == 37){ // left
    	if(activeElementType == "results"){
        	if(activeElementIndex % columns == 0){
            	activeElementType = "categories";
                activeElementIndex = 0;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[0];
            }
            else{
 				activeElementIndex --;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
    	}
    	else if(activeElementType == "categories"){
    		activeElementType = "leftMenu";
            activeElement = leftMenuElements[4];
            activeElementIndex = 4;
    	}
    	else if(activeElementType == "leftMenu"){
    	}
    	else if (activeElementType == "searchKeyboard"){
    		activeElementType = "leftMenu";
            activeElement = leftMenuElements[1]; 
            activeElementIndex = 1;
    	}
	}
    else if(keyCode == 38){ // up
    	if (activeElementType == "results"){
            var activeId = activeElementIndex - columns;
            if(activeId >= 0){
            	activeElementIndex -= columns;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                        
            }
            else{
            	//$("#keyboard").getkeyboard().reveal(); 
                activeElement = "keyboard";
                activeElementType = "searchKeyboard";
            }
        }
        else if(activeElementType == "categories"){
    		if (activeElementIndex > 0){
            	activeElementIndex  --;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[activeElementIndex];
            }
    	}
        else if(activeElementType == "leftMenu"){
        	if(activeElementIndex > 0){
            	activeElementIndex--;
                activeElement = leftMenuElements[activeElementIndex];
            }
        }
        else if (activeElementType == "searchKeyboard"){    		
    	}
    }
    else if(keyCode == 39){ // right
    	if(activeElementType == "results"){
            if(activeElementIndex < totalResults - 1){
            	activeElementIndex ++;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
        }
        else if(activeElementType == "categories"){
            activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
        }
        else if (activeElementType == "leftMenu"){
        	activeElementType = "categories";
            activeElementIndex = 0;
            activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[0];
        }
        else if (activeElementType == "searchKeyboard"){
    	}
    }
    else if(keyCode == 40){ // down
    	if (activeElementType == "results"){
            var activeId = activeElementIndex + columns;
            if(activeId < totalResults){
            	activeElementIndex += columns;
                activeElement = "receta_" + activeElementIndex;

                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                    
            }
        }    
        else if(activeElementType == "categories"){
    		if (activeElementIndex < $('#listaCategoriasBusquedaAvanzada').children().length - 1){
            	activeElementIndex  ++;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[activeElementIndex];
            }
    	}
        else if(activeElementType == "leftMenu"){
            if(activeElementIndex < leftMenuElements.length - 1){
            	activeElementIndex++;
            	activeElement = leftMenuElements[activeElementIndex];                    
            }                                
        }
        else if (activeElementType == "searchKeyboard"){
    		activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
    	}
    }
}

function navigateSearch(keyCode){
	if(keyCode == 37){ // left
    	if(activeElementType == "results"){
        	if(activeElementIndex % columns == 0){
            	activeElementType = "categories";
                activeElementIndex = 0;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[0];
            }
            else{
 				activeElementIndex --;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
    	}
    	else if(activeElementType == "categories"){
    		activeElementType = "leftMenu";
            activeElement = leftMenuElements[1];
            activeElementIndex = 1;
    	}
    	else if(activeElementType == "leftMenu"){
    	}
    	else if (activeElementType == "searchKeyboard"){
    		activeElementType = "leftMenu";
            activeElement = leftMenuElements[1]; 
            activeElementIndex = 1;
    	}
    	else if (activeElementType == "filter"){
    		if (activeElementIndex > 0){
    			activeElementIndex--;
    			activeElement = filterElements[activeElementIndex]; 
    		}
    		else{
    			activeElementType = "leftMenu";
            	activeElement = leftMenuElements[1]; 
            	activeElementIndex = 1;
            }
    	}
	}
    else if(keyCode == 38){ // up
    	if (activeElementType == "results"){
            var activeId = activeElementIndex - columns;
            if(activeId >= 0){
            	activeElementIndex -= columns;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                        
            }
            else{
            	activeElementType = "filter";
            	activeElementIndex = 0;
            	activeElement = filterElements[0];
            }
        }
        else if(activeElementType == "categories"){
    		if (activeElementIndex > 0){
            	activeElementIndex  --;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[activeElementIndex];
            }
            else{
            	activeElementType = "filter";
            	activeElementIndex = 0;
            	activeElement = filterElements[0];
            }
    	}
        else if(activeElementType == "leftMenu"){
        	if(activeElementIndex > 0){
            	activeElementIndex--;
                activeElement = leftMenuElements[activeElementIndex];
            }
        }
        else if (activeElementType == "searchKeyboard"){    		
    	}
    	else if (activeElementType == "filter"){
    		activeElement = "keyboard";            	
            activeElementType = "searchKeyboard";
    	}
    }
    else if(keyCode == 39){ // right
    	if(activeElementType == "results"){
            if(activeElementIndex < totalResults - 1){
            	activeElementIndex ++;
                activeElement = "receta_" + activeElementIndex;
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
        }
        else if(activeElementType == "categories"){
            activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
        }
        else if (activeElementType == "leftMenu"){
        	activeElementType = "categories";
            activeElementIndex = 0;
            activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[0];
        }
        else if (activeElementType == "searchKeyboard"){
    	}
    	else if (activeElementType == "filter"){
    		if (activeElementIndex < filterElements.length - 1){
    			activeElementIndex ++;
    			activeElement = filterElements[activeElementIndex]; 
    		}
    	}
    }
    else if(keyCode == 40){ // down
    	if (activeElementType == "results"){
            var activeId = activeElementIndex + columns;
            if(activeId < totalResults){
            	activeElementIndex += columns;
                activeElement = "receta_" + activeElementIndex;

                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
                	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });                    
            }
        }    
        else if(activeElementType == "categories"){
    		if (activeElementIndex < $('#listaCategoriasBusquedaAvanzada').children().length - 1){
            	activeElementIndex  ++;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[activeElementIndex];
            }
    	}
        else if(activeElementType == "leftMenu"){
            if(activeElementIndex < leftMenuElements.length - 1){
            	activeElementIndex++;
            	activeElement = leftMenuElements[activeElementIndex];                    
            }                                
        }
        else if (activeElementType == "searchKeyboard"){
        	activeElementType = "filter";
            activeElementIndex = 0;
            activeElement = filterElements[0];
        }
        else if (activeElementType == "filter"){
    		activeElementType = "results";
            activeElementIndex = 0; 
            activeElement = "receta_0"; 
            var container = $("#resultadoRecetas");
            var scrollTo = $('#' + activeElement);

            container.animate({
            	scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
    	}
    }
}

function navigateLogin(keyCode){
	if(keyCode == 37){ // left
    	if(activeElement == "noUser"){
        	activeElement = "lostPassword";            
    	}
	}
    else if(keyCode == 38){ // up
    	if (activeElement == "noUser" || activeElement == "lostPassword"){
            activeElement = "submit";
        }
        else if(activeElement == "submit"){
        	activeElement = "pass";
        }
        else if(activeElement == "pass"){
        	activeElement = "user";
        }
    }
    else if(keyCode == 39){ // right
    	if(activeElement == "lostPassword"){
        	activeElement = "noUser";            
    	}
    }
    else if(keyCode == 40){ // down
    	if (activeElement == "submit"){
            activeElement = "lostPassword";
        }
        else if(activeElement == "pass"){
        	activeElement = "submit";
        }
        else if(activeElement == "user"){
        	activeElement = "pass";
        }
    }
}

function navigateDetails(keyCode){
	if(keyCode == 37){ // left
    	if(activeElementType == "header"){
        	if (activeElement == "favoritosBtn"){
        		activeElement = "jStar";
        	}            
    	}
    	else if (activeElementType == "tabs"){
    		if (activeElement == "instruccionesTab"){
    			activeElement = "ingredientesTab";
    		}
    	}
    	else if (activeElementType == "photo"){
    		activeElement = "instruccionesTab";
    		activeElementType = "tabs";
    	}
    	else if (activeElementType == "voice"){
    		if (activeElementIndex > 0){
    			activeElementIndex --;
    			activeElement = voiceBtnElements[activeElementIndex];
    		}
    	}
    	else if (activeElementType == "suggestions"){
    		if (activeElement == "slick-center"){
    			activeElement = "slick-prev";
    		}
    		else if (activeElement == "slick-next"){
    			activeElement = "slick-center";
    		}
    	}
	}
    else if(keyCode == 38){ // up
    	if(activeElementType == "header"){
        	     
    	}
    	else if (activeElementType == "tabs"){
    		activeElementType = "header";
    		activeElement = "favoritosBtn";
    	}
    	else if (activeElementType == "photo"){
    		activeElementType = "header";
    		activeElement = "favoritosBtn";
    	}
    	else if (activeElementType == "voice"){
    		activeElementType = "tabs";
    		activeElement = "instruccionesTab";
    	}
    	else if (activeElementType == "suggestions"){
    		activeElementType = "tabs";
    		activeElement = "ingredientesTab";
    	}
    }
    else if(keyCode == 39){ // right
    	if(activeElementType == "header"){
        	if (activeElement == "jStar"){
        		activeElement = "favoritosBtn";
        	}            
    	}
    	else if (activeElementType == "tabs"){
    		if (activeElement == "ingredientesTab"){
    			activeElement = "instruccionesTab";
    		}
    		else if (activeElement == "instruccionesTab"){
    			activeElementType = "photo";
    			activeElement = "recipeImag";
    		}
    	}
    	else if (activeElementType == "photo"){
    		
    	}
    	else if (activeElementType == "voice"){
    		if (activeElementIndex < voiceBtnElements.length - 1){
    			activeElementIndex ++;
    			activeElement = voiceBtnElements[activeElementIndex];
    		}
    		else{
    			activeElementType = "photo";
    			activeElement = "recipeImag";
    		}
    	}
    	else if (activeElementType == "suggestions"){
    		if (activeElement == "slick-center"){
    			activeElement = "slick-next";
    		}
    		else if (activeElement == "slick-prev"){
    			activeElement = "slick-center";
    		}
    	}
    }
    else if(keyCode == 40){ // down
    	if(activeElementType == "header"){
        	activeElementType = "photo";
    		activeElement = "recipeImag";     
    	}
    	else if (activeElementType == "tabs"){
    		if (activeElement == "ingredientesTab"){
    			activeElementType = "suggestions";
    			activeElement = "slick-center";
    		}
    		else if (activeElement == "instruccionesTab"){
    			activeElementType = "voice";
    			activeElementIndex = "1";
    			activeElement = voiceBtnElements[activeElementIndex];
    		}
    	}
    	else if (activeElementType == "photo"){
    		
    	}
    	else if (activeElementType == "voice"){
    		activeElementType = "suggestions";
    		activeElement = "slick-center";
    	}
    	else if (activeElementType == "suggestions"){
    		
    	}
    }
}

function cleanNavigation(){
	if(activeElementType == "categories"){
		$(activeElement).removeClass('keynav');	
	}
	else if(activeElementType == "suggestions"){
		$("." + activeElement).removeClass('keynav');	
	}
	else{
		$("#" + activeElement).removeClass('keynav');
	}
}

function addNavigation(){
	if(activeElementType == "categories"){
		$(activeElement).addClass('keynav');	
	}
	else if(activeElementType == "suggestions"){
		$("." + activeElement).addClass('keynav');	
	}
	else{
		$("#" + activeElement).addClass('keynav');	
	}
	
}

function executeElement(){
	cleanSelection();
	if(activeElementType == "categories"){
		$(activeElement).click();	
	}
	else if (activeElementType == "photo"){
		$("#videoBtn").click();		
		activeView = "view_video";
	}
	else if (activeElement == "slick-center"){
		$("." + activeElement).children('img').click();
	}
	else if(activeElementType == "suggestions"){
		$("." + activeElement).click();	
	}
	else if (activeElement == "keyword"){
		$("#keyboard").getkeyboard().reveal();
	}
	else{
		$("#" + activeElement).click();	
	}
	addSelection();
	
}

function cleanSelection(){
//	$("#" + selectedElement).removeClass('selected');
}

function addSelection(){
//	$("#" + selectedElement).addClass('selected');
}