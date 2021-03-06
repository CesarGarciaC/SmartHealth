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
- "view_confLogout"

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
        activeElementType = "leftMenu";
        activeElement = "menu1";
		$("#menu1").addClass("selected");
    	addNavigation();
	}
	else if(view == "view_recientes"){
		
	}
	else if(view == "view_favoritos"){
		
	}
	else if(view == "view_login"){
		cleanNavigation();
		//cleanSelection();
		$("#user").addClass("keynav");
        activeElement = "user";	
	}
	else if(view == "view_categorias"){
		
	}
	else if(view == "view_busqueda"){
		
	}
	else if(view == "view_detalles"){
		cleanNavigation();
		activeElementType = "photo";
		activeElement = "recipePhoto";
		addNavigation();
	}
	else if(view == "view_video"){
		cleanNavigation();

        activeElement = "ytiframe";
        addNavigation();
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
    		if (activeElement == "cal_min"){
                activeElementType = "leftMenu";
                activeElement = leftMenuElements[1]; 
                activeElementIndex = 1;
            }
            else if (activeElement == "cal_max"){
                activeElement = "cal_min";
            }
            else if (activeElementIndex > 0){
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
            	activeElement = "cal_min";
            }
        }
        else if(activeElementType == "categories"){
    		if (activeElementIndex > 0){
            	activeElementIndex  --;
                activeElement = $('#listaCategoriasBusquedaAvanzada').children().toArray()[activeElementIndex];
            }
            else{
            	activeElementType = "filter";
            	activeElement = "cal_min";
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
            if (activeElement == "cal_min" || activeElement == "cal_max"){
                activeElementIndex = 0;
                activeElement = filterElements[activeElementIndex]; 
            }
            else{
                activeElement = "keyboard";             
                activeElementType = "searchKeyboard";    
            }
    		
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
    		if (activeElement == "cal_min"){
                activeElement = "cal_max";
            }
            else if (activeElement == "cal_max"){
                
            }            
            else if (activeElementIndex < filterElements.length - 1){
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
    		if (activeElement == "cal_min" || activeElement == "cal_max"){
                activeElementType = "results";
                activeElementIndex = 0; 
                activeElement = "receta_0"; 
                var container = $("#resultadoRecetas");
                var scrollTo = $('#' + activeElement);

                container.animate({
            	   scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });
            }
            else{
                activeElement = "cal_min";
            }
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
        		activeElement = "ratingUsuario";
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
                activeElementType = "suggestions";
    			activeElement = "slick-prev";
    		}
    		else if (activeElement == "slick-next"){
                activeElementType = "suggestions";
    			activeElement = "slick-center";
    		}
    	}
        else if (activeElementType == "scroll"){
            
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
    		activeElementType = "scroll";
            if ($('#ingredientesTab').hasClass("tab-current")){
    		  activeElement = "scrollDown1";
            }
            else{
              activeElement = "scrollDown2";
            }
    	}
        else if (activeElementType == "scroll"){
            if (activeElement == "scrollUp1" || activeElement == "scrollUp2"){
                activeElementType = "tabs";
                activeElement = "instruccionesTab";    
            }
            else if (activeElement == "scrollDown1"){
                activeElement = "scrollUp1";
            }
            else if (activeElement == "scrollDown2"){
                activeElement = "scrollUp2";    
            }
            
        }
    }
    else if(keyCode == 39){ // right
    	if(activeElementType == "header"){
        	if (activeElement == "ratingUsuario"){
        		activeElement = "favoritosBtn";
        	}            
    	}
    	else if (activeElementType == "tabs"){
    		if (activeElement == "ingredientesTab"){
    			activeElement = "instruccionesTab";
    		}
    		else if (activeElement == "instruccionesTab"){
    			activeElementType = "photo";
    			activeElement = "recipePhoto";
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
    			activeElement = "recipePhoto";
    		}            
    	}
    	else if (activeElementType == "suggestions"){
    		if (activeElement == "slick-center"){
    			activeElement = "slick-next";
    		}
    		else if (activeElement == "slick-prev"){
                activeElementType = "suggestions";
    			activeElement = "slick-center";
    		}
    	}
        else if (activeElementType == "scroll"){
            activeElementType = "photo";
            activeElement = "recipePhoto";
        }
    }
    else if(keyCode == 40){ // down
    	if(activeElementType == "header"){
        	activeElementType = "photo";
    		activeElement = "recipePhoto";     
    	}
    	else if (activeElementType == "tabs"){
    		if (activeElement == "ingredientesTab"){
    			if ($('#ingredientesTab').hasClass("tab-current")){
                    activeElementType = "scroll";
                    activeElement = "scrollUp1";    
                }
                else{
                    activeElementType = "suggestions";
                    activeElement = "slick-center";
                }                
    		}
    		else if (activeElement == "instruccionesTab"){
                if ($('#instruccionesTab').hasClass("tab-current")){
                    activeElementType = "voice";
                    activeElementIndex = "1";
                    activeElement = voiceBtnElements[activeElementIndex];
                }
                else{
                    activeElementType = "suggestions";
                    activeElement = "slick-center";
                }    			
    		}
    	}
    	else if (activeElementType == "photo"){
    		
    	}
    	else if (activeElementType == "voice"){
    		activeElementType = "scroll";
    		activeElement = "scrollUp2";
    	}
    	else if (activeElementType == "suggestions"){
    		
    	}
        else if (activeElementType == "scroll"){
            if (activeElement == "scrollUp1"){
                activeElement = "scrollDown1";    
            }
            else if (activeElement == "scrollUp2"){
                activeElement = "scrollDown2";    
            }
            else if (activeElement == "scrollDown1" || activeElement == "scrollDown2"){
                activeElementType = "suggestions";
                activeElement = "slick-center";
            }
            
        }
    }
}

function cleanNavigation(){
	if(activeElementType == "categories"){
		$(activeElement).removeClass('keynav');	
	}
	else if(activeElementType == "suggestions"){
        if(activeElement == "slick-center"){
            $("." + activeElement + " img").removeClass('keynav2');
        }
        else{
            $("." + activeElement).removeClass('keynav');  
        }
    }
    /*else if(activeElement == "ratingUsuario"){
        $("." + activeElement).removeClass('keynav');
    }*/
    else{
		$("#" + activeElement).removeClass('keynav');
	}
}

function addNavigation(){
	if(activeElementType == "categories"){
		$(activeElement).addClass('keynav');	
	}
	else if(activeElementType == "suggestions"){
        if(activeElement == "slick-center"){
            $("." + activeElement + " img").addClass('keynav2');
        }
        else{
            $("." + activeElement).addClass('keynav');  
        }
    }
    /*else if(activeElement == "ratingUsuario"){
        $("." + activeElement).addClass('keynav');
    }*/
	else{
		$("#" + activeElement).addClass('keynav');	
	}
	
}

function executeElement(){
    cleanSelection();
	if(activeElementType == "categories"){
		
        $(activeElement).find('a').click();	
	}
	else if (activeElementType == "photo"){
		$("#videoBtn").click();		
		activeView = "view_video";
	}
	/*else if (activeElement == "slick-center"){
		$("." + activeElement).children('img').click();
	}*/
	else if(activeElementType == "suggestions"){
        if(activeElement == "slick-center"){
            $("." + activeElement + " img").click();
        }
        else{
            $("." + activeElement).click();  
        }
	}
	else if (activeElement == "keyboard"){
		$("#keyboard").getkeyboard().reveal();
        activeView = 'view_keyboard';
	}
    else if(activeElement == "user"){
        $("#user").getkeyboard().reveal();
        activeView = 'view_keyboard';
    }
    else if(activeElement == "pass"){
        $("#pass").getkeyboard().reveal();
        activeView = 'view_keyboard';
    }
    else if(activeElement == "cal_min"){
        $("#cal_min").getkeyboard().reveal();
        activeView = 'view_keyboard';
    }
    else if(activeElement == "cal_max"){
        $("#cal_max").getkeyboard().reveal();
        activeView = 'view_keyboard';
    }
    else if (activeElementType == "scroll"){
        if($('#' + activeElement).hasClass("scroll-up-btn")){
            $('.scroll-up-btn img').click();
        }
        else if($('#' + activeElement).hasClass("scroll-down-btn")){
            $('.scroll-down-btn img').click();
        }
    }
    else if (activeView != "view_confLogout" && activeElement == "Usuario"){
        if (User.id == ""){
            $('#usuarioLogin').click();
        }
        else{
            $('#usuarioLogout').click();
            activeView = "view_confLogout";
        }
    }
    else if (activeView == "view_confLogout"){
        $('#btnAceptToast').click();
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