//Variables Globales
//var urlConexion='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php';
var urlConexion = 'http://200.16.7.111/dev/sexy_service/sexy_restful.php';//
//var urlConexion='http://54.86.215.225/sexy_service/sexy_restful.php';
var numbuttons = 4;

var lastWindow = {
    windows: 'holi',
    categories: '',
    keyword: '',
}
var smartFlag = false;
var isTop10 = false;
var categorias2 = {
    "categorias": [
        {
            "id": 1,
            "nombre": "Bebidas",
            "descripcion": ""
        },
        {
            "id": 2,
            "nombre": "Entrada",
            "descripcion": ""
        },
        {
            "id": 3,
            "nombre": "Fondo",
            "descripcion": ""
        },
        {
            "id": 4,
            "nombre": 'Postre',
            "descripcion": ""
        },
        {
            "id": 5,
            "nombre": "Vegano",
            "descripcion": ""
        },
        {
            "id": 6,
            "nombre": "Vegetariano",
            "descripcion": ""
        }
    ]

}


var RecipesGlobal = new Array();
var selectedRecipe = '';

var columns;
var totalResults;

// keyboard events
var activeView = "view_top10";


var leftMenuElements = ["Usuario", "menu1", "menuFavoritos", "menuRecientes", "menuCategorias"];
var filterElements = ["filtroPuntuacion", "filtroRecientes", "filtroTiempo", "filtroDificultad"];
var voiceBtnElements = ["voiceBckBtn", "voicePlayBtn", "voiceStopBtn", "voiceFwdBtn"];

var activeElementIndex = 1;
var selectedMenuItem = "menu1";
var selectedCategorieItem;
var activeElement = leftMenuElements[1];
var activeElementType = "leftMenu";

var isInFavoriteView = false;
var recipeIsInFavorites = false;
var inLogin = false;

$(document).ready($(function()
{

    /////////////////////////////Nombre usuario al iniciar sesion////////
    if (User.id != "") {
        var targetdiv = $('#Usuario');
        var UserDiv = "<center><img src=\"images/user.png\">" + User.nicename + "</center>" + "<center id=\"CloseSesion\" onclick=\"CloseSesion()\">Cerrar Sesión</center>";
        targetdiv.html(UserDiv);
    }
    else
    {
        //$("#menuFavoritos").removeAttr('onclick')
        //mostrarMensajeInformativo("Es necesario iniciar sesión para acceder a favoritos")

    }
    //Categorias

    getCategories(false);
    getCategories(true);

    //Tips y Eventos
    paintEventsTips();

    //var updatedData = busquedaRecetas(3, "", "");

    initView(activeView);

    $(document).keydown(function(event) {
        // capturar si son teclas de navegación
        // deseleccionar el elemento seleccionado
        // llamar a la navegacion de la vista actual
        // actualizar elemento seleccionado

        // capturar si es la tecla enter

        // capturar si es la tecla back
        cleanNavigation();

        var keyCode = event.keyCode;
        //alert(keyCode);
        var activeId;

        if (keyCode >= 37 && keyCode <= 40) {
            if (activeView == "view_top10") {
                navigateTop10(keyCode);
            }
            else if (activeView == "view_recientes") {
                navigateTop10(keyCode);
            }
            else if (activeView == "view_favoritos") {
                navigateTop10(keyCode);
            }
            else if (activeView == "view_categorias") {
                navigateCategories(keyCode);
            }
            else if (activeView == "view_login") {
                navigateLogin(keyCode);
            }
            else if (activeView == "view_busqueda") {
                navigateSearch(keyCode);
            }
            else if (activeView == "view_detalles") {
                navigateDetails(keyCode);
            }
            else
                return true;

            addNavigation();
        }

        else if (keyCode == 13) { // enter
            if (activeView != "view-keyboard") {
                executeElement();

                addNavigation();
            }
        }

        else if (keyCode == 461 || keyCode == 72 || keyCode == 27) { // back

            if (activeView == "view_video") {
                $("#vl_closeBtn").click();
                activeView = "view_detalles";
                initView(activeView);
            }
            else if (activeView == "view_login") {
                $("#user_closeBtn").click();
                activeView = "view_top10";
                initView(activeView);
            }
            else if (activeView == "view_confLogout") {
                $('#btnCancelToast').click();
                activeView = "view_top10";
                initView(activeView);
            }
            /*if (isClicked){
             //alert("cancelar");
             cancelarSeleccion(activeElementIndex);
             }*/

            //if (isInFavoriteView)
            //    obtenerFavoritos()

            else if (activeView == "view_detalles") {
                $('#recipe-details').addClass("invisible-block");
                $('#data-container').removeClass("invisible-block");
                activeView = "view_top10";
                initView(activeView);
                actualizarVolver();
            }
            else if (activeView == "view_keyboard" && activeElement == "keyboard") {
                $("#keyboard").getkeyboard().close();
                activeView = "view_top10";
                //initView(activeView);
            }
            else if (activeView == "view_keyboard" && activeElementType == "filter") {
                $("#cal_min").getkeyboard().close();
                $("#cal_max").getkeyboard().close();
                activeView = "view_busqueda";
                //initView(activeView);
            }


            addNavigation();

        }

        //addNavigation();

        return false;
    });

    $('#user').bind('beforeClose.keyboard', function(e, keyboard, el, accepted) {
        activeView = "view_login";
    });

    $('#pass').bind('beforeClose.keyboard', function(e, keyboard, el, accepted) {
        activeView = "view_login";
    });

    /* manejando doble foco */
    $('.menu-option').mouseover(function() {
        cleanNavigation();
    });

    $('.detalle-receta').mouseover(function() {
        cleanNavigation();
    });

    $('#keyboard').mouseover(function() {
        cleanNavigation();
    });

    $('#listaCategoriasBusquedaAvanzada li').mouseover(function() {
        cleanNavigation();
    });

    $('.orderby-btn').mouseover(function() {
        cleanNavigation();
    });

    $('#ingredientesTab').mouseover(function() {
        cleanNavigation();
    });

    $('#instruccionesTab').mouseover(function() {
        cleanNavigation();
    });

    $('#favoritosBtn').mouseover(function() {
        cleanNavigation();
    });

    $('.scroll-btn').mouseover(function() {
        cleanNavigation();
    });

    $('#usuarioLogin').click(function() {
        var userIframe;
        userIframe = '<iframe id="loginIframe" width="854" height="510" src="login.html" frameborder="0" allowfullscreen></iframe>';
        $("#main-container").stop(true).animate({opacity: 0.2}, 100);
        $("#userlayer").fadeIn(200);
        activeView = "view_login";
        initView(activeView);

    });

    $('#user_closeBtn').click(function() {
        inLogin = false;
        $("#main-container").stop(true).animate({opacity: 1}, 100);
        $("#userlayer").fadeOut(100);
    });

    $('#usuarioLogout').click(function() {
        mostrarMensajePregunta("¿Seguro desea cerrar la sesión? \n Recetas favoritas y las opciones de compartir y valorar recetas no estaras disponibles.", "ConfirmationCloseSesion()");

    });


    $("#menu1").click();

    //$('#keyboard').getkeyboard().addNavigation();  
    $(".mCustomScrollbar").mCustomScrollbar({autoHideScrollbar: true});
    /*$(".mCustomScrollbar").mousedown(function(event){
     $(".mCustomScrollbar").mCustomScrollbar("scrollTo",event.clientY);
     });*/
    $(".menu-option").click(function() {
        /*if(activeElementType == "results")
         $("#" + activeElement).removeClass('detalle-receta-seleccionada');    
         else if (activeElementType == "leftMenu"){
         $("#" + activeElement).removeClass("keynav");
         }*/

        cleanNavigation();
        activeElement = $(this).attr("id");
        activeElementIndex = leftMenuElements.indexOf(activeElement);
        $("#" + selectedMenuItem).removeClass("selected");
        selectedMenuItem = activeElement;
        $("#" + selectedMenuItem).addClass("selected");
        addNavigation();

        if (this.id == "menu1") {
            document.getElementById("iconoTop10").src="images/estrellaNaranja.png";
            document.getElementById("iconoFavoritos").src="images/corazonBlanco.png";
            document.getElementById("iconoRecientes").src="images/novedadesBlanco.png";
            document.getElementById("iconoCategorias").src="images/icono-libro-receta2.png";
            document.getElementById("tituloCentral").innerHTML="Top 10";
            
        }
        if (this.id == "menuFavoritos") {
            
            document.getElementById("iconoTop10").src="images/estrellaBlanca.png";
            document.getElementById("iconoFavoritos").src="images/corazonNaranja.png";
            document.getElementById("iconoRecientes").src="images/novedadesBlanco.png";
            document.getElementById("iconoCategorias").src="images/icono-libro-receta2.png";
            if(User.id!==""){
            document.getElementById("tituloCentral").innerHTML="Favoritos";}
        }
        if (this.id == "menuRecientes") {
            document.getElementById("iconoTop10").src="images/estrellaBlanca.png";
            document.getElementById("iconoFavoritos").src="images/corazonBlanco.png";
            document.getElementById("iconoRecientes").src="images/novedadesNaranja.png";
            document.getElementById("iconoCategorias").src="images/icono-libro-receta2.png";
            document.getElementById("tituloCentral").innerHTML="Novedades";
        }
        if (this.id == "menuCategorias") {
            document.getElementById("iconoTop10").src="images/estrellaBlanca.png";
            document.getElementById("iconoFavoritos").src="images/corazonBlanco.png";
            document.getElementById("iconoRecientes").src="images/novedadesBlanco.png";
            document.getElementById("iconoCategorias").src="images/icono-libro-recetaNaranja.png";
            document.getElementById("tituloCentral").innerHTML="Categorías";
        }
        /*if(this.id=="menuFavoritos"){
         if(User.id!==""){
         $("#" + selectedMenuItem).removeClass("selected");
         selectedMenuItem = this.id;
         $(this).addClass("selected");
         }
         }
         else {
         $("#" + selectedMenuItem).removeClass("selected");
         selectedMenuItem = this.id;
         $(this).addClass("selected");
         }*/
    });

}));

function scrollToPosition(elem, pos) {
    $(elem).mCustomScrollbar("scrollTo", pos);
}

function closeIframe() {
    mostrarMensajeInformativo("Bienvenido " + User.nicename);
    $("#main-container").stop(true).animate({opacity: 1}, 100);
    $("#userlayer").fadeOut(100);

}

function ConfirmationCloseSesion() {
    document.getElementById('usuarioLogin').innerHTML = " Iniciar Sesión";
    document.getElementById('usuarioLogout').innerHTML = "";
    document.getElementById('iniSesion').innerHTML = "";
    if (isInFavoriteView) {
        isInFavoriteView = false;
        isTop10 = true;
        busquedaTop10();
        selectedMenuItem = "menu1";
        $("#menuFavoritos").removeClass("selected");
        $("#menu1").addClass("selected");
    }
    User = new UserData("", "", "");
    activeView = "view_top10";
    initView(activeView);
}

function sleep(millis, callback) {
    setTimeout(function() {
        callback();
    }, millis);
}

function paintRecipes(numColumns, data2) {
    totalResults = data2.recetas.length;
    var targetdiv = $('#resultadoRecetas')
    if (numColumns == 2)
        targetdiv.css("width", "70%");
    var recetaDiv = "<table>";
    for (var i = 0; i < data2.recetas.length; i++) {
        if (i % numColumns == 0)
            recetaDiv += '<tr>';
        recetaDiv += '<td><div id="receta_' + i + '" value="receta_' + data2.recetas[i].id + '" class="detalle-receta">';

        var puntuacion = '<div style="float:left; margin-bottom:20px;" class="basicNoEditable" data-average="' + parseInt(data2.recetas[i].rating / data2.recetas[i].raters) + '"data-id="' + data2.recetas[i].id + '"></div>';

        var nameAlt = data2.recetas[i].name;
        if (nameAlt.length >= 50) {
            nameAlt = nameAlt.substring(0, 48);
            nameAlt += "...";
        }


        var textoReceta = '<div id=textReceta_' + i + ' class="texto-detalle"><p>' + nameAlt + '</p></div>';
        var imagenReceta = '<div id=imagenReceta_' + i + ' class="imagen-detalle"><img src="data:image/jpg;base64,' + data2.recetas[i].image + '" width="82 "height="76"></div>';
        recetaDiv += puntuacion + textoReceta + imagenReceta;
        if (isTop10) {

            var top = '<div id="top_' + i + '" style="float: left;position: relative; background: url(images/smooth-star.png); width: 40px; height: 40px;"><h2 align=center>' + (i + 1) + '</h2></div>';
            recetaDiv += top;

        }

        recetaDiv += '</div></td>';
        if (i % numColumns == numColumns - 1)
            recetaDiv += '</tr>'
    }
    isTop10 = false;
    recetaDiv += '</table>';
    targetdiv.html(recetaDiv);



    for (var i = 0; i < data2.recetas.length; i++) {

        //$('#star_'+i).rating('votar.php', {maxvalue: 5, curvalue:1, id:20});
        $('#receta_' + i).mouseover(function() {
            cleanNavigation();
            if (activeElementType == "results") {
                $("#" + activeElement).removeClass('detalle-receta-seleccionada');
            }
            /*else if (activeElementType == "leftMenu"){
             $("#" + activeElement).css("background-color","");
             }*/
            $(this).addClass('detalle-receta-seleccionada');
            activeElement = 'receta_' + i;
            activeElementType = "results";
            activeElementIndex = $(this).attr("id").split('_')[1];

        });
        $('#receta_' + i).mouseout(function() {
            $(this).removeClass('detalle-receta-seleccionada');

        });
        $('#receta_' + i).click(function() {
            clickReceta(this.id, $(this).attr("id"), $(this).attr("value"));
            //activeElementType = "detailsView";
            //isClicked = true;
        });
    }
    reloadRating();
    hackStars();

}

$(document).click(function(event) {
    if (selectedRecipe != '') {

        if (!$(event.target).is('#' + selectedRecipe)) {
            var idDelete = selectedRecipe.split("_")[1];
            cancelarSeleccion(idDelete);
        }
    }
})

function clickReceta(elemId, id, value) {
    //$('#botonVer_' + id).css("background-color","orange");
    //isClicked = true;
    /*if (selectedRecipe.length) {
     var idDelete = selectedRecipe.split("_")[1];
     var idActual = id.split("_")[1];
     if (idDelete != idActual)
     cancelarSeleccion(idDelete);
     }
     
     if ($('#select_' + elemId).length) {
     }
     else {
     selectedRecipe = elemId;
     var newdiv = document.createElement('div');
     newdiv.setAttribute('id', 'select_' + elemId);
     newdiv.setAttribute('class', 'submenu');
     
     var id = value.split("_")[1];
     
     document.getElementById(elemId).appendChild(newdiv);
     var btnFav='<button id="botonFav_' + elemId + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos +</button>';
     if (isInFavoriteView)
     {
     btnFav='<button id="botonFav_' + elemId + '" onclick="eliminarFavoritosPreview(' + id + ')">Favoritos X</button>';
     }
     else
     {
     if (User.id=="")
     {
     
     btnFav='<button disabled="true" id="botonFav_' + elemId + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos +</button>';
     }
     else
     {
     //                    var listaFavoritos=obtenerListaFavoritos();
     var flagFavorites=isInFavorites(id);
     if (flagFavorites>0)
     {
     recipeIsInFavorites=true;
     btnFav='<button disabled="true" id="botonFav_' + elemId + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos ✓✓</button>';
     }
     else
     {
     btnFav='<button id="botonFav_' + elemId + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos +</button>';
     recipeIsInFavorites=false;
     }
     }
     }
     $('#select_' + elemId).html(btnFav
     + '<button id="botonVer_' + elemId + '" onclick="seleccionarReceta(' + id + ')">Ver</button>'
     + '<button id="botonCan_' + elemId + '" onclick="cancelarSeleccion(' + id + ')" >Cancelar</button>');
     
     }*/

    /**********************/
    //Click defrente a Detalle Receta
    /**********************/

    seleccionarReceta($("#" + elemId).attr("value").split("_")[1]);
    //isInDetailView = true;
    //activeElementType = "detailsView";
}

function cancelarSeleccion(idDiv) {

    var mainDiv = document.getElementById('receta_' + idDiv);
    var deleteDiv = document.getElementById('select_receta_' + idDiv);
    try {
        mainDiv.removeChild(deleteDiv);
        selectedRecipe = '';
        //isClicked = false;
    } catch (ex) {
    }

}

function urlConex() {
    return urlConexion;

}

function busquedaRecientes() {

    lastWindow.windows = 'Novedades';
    activeView = "view_recientes";
    columns = 3;
    try
    {
        $("#search-advanced").hide();
        $("#categorias-menu").hide();
        $(".resultado-recetas").css("width", "95%");
        $(".resultado-recetas").css("height", "75%");
        $(".resultado-recetas").css("left", "20px");
        var data = "";
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: urlConexion + '?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

                //data.data.sort(function(a, b) {
                //    return new Date(b.created_at) - new Date(a.created_at)
                //});

                var updatedData = {
                    "recetas": data.data
                };
                var today = new Date();
                //var lastTwoMonths = new Date(today.setMonth(today.getMonth() - 1));

                var RecipesLastTwoMonths = new Array();
                for (var i = 0; i < updatedData.recetas.length; i++) {
                    //if (new Date(updatedData.recetas[i].created_at) > lastTwoMonths)
                        RecipesLastTwoMonths.push(updatedData.recetas[i]);

                }
                var RecipesGet = {
                    "recetas": RecipesLastTwoMonths
                };

                paintRecipes(3, RecipesGet);
                return updatedData;
            }
        });

    } catch (ex) {
        alert(ex.description)
    }

}

function busquedaTop10() {
    lastWindow.windows = 'Top10';
    columns = 3;

    try
    {
        isTop10 = true;
        $("#search-advanced").hide();
        $("#categorias-menu").hide();
        $(".resultado-recetas").css("width", "95%");
        $(".resultado-recetas").css("height", "75%");
        $(".resultado-recetas").css("left", "20px");
        var data = "";
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: urlConexion + '?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

                data.data.sort(function(a, b) {		
					var aPoint=5;
					if(a.raters!=0)	aPoint=(a.rating / a.raters);
					var bPoint=5;
					if(b.raters!=0)	bPoint=(b.rating / b.raters);
					
                    return bPoint - aPoint			;	
                });

                var updatedData = {
                    "recetas": data.data
                };

                var RecipesLastTop10 = new Array();

                var minVar;
                if (data.data.length < 10)
                    minVar = data.data.length;
                else
                    minVar = 10;

                for (var i = 0; i < minVar; i++) {
                    RecipesLastTop10.push(updatedData.recetas[i]);
                }

                var RecipesGet = {
                    "recetas": RecipesLastTop10
                };

                activeView = "view_top10";

                paintRecipes(3, RecipesGet);



                return updatedData;
            }
        });

    } catch (ex) {
        alert(ex.description)
    }

}

function cambiarMouseSelected() {
    document.body.style.cursor = 'pointer';
}

function quitarMouseSelected() {
    document.body.style.cursor = 'pointer';
}

function busquedaRecetas(column, cat, keyword)
{
    columns = column;

    try
    {
        //var data_category='<mns1:id_category xmlns:mns1="http://www.dreamsolutions.com/sexy_service/">'+cat+'</mns1:id_category>'
        //var webServiceURL='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/sexy_service.wsdl';
        //var soapRequest='<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.dreamsolutions.com/sexy_service/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><SOAP-ENV:Body>'+data_category+'<mns1:keyword xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:keyword><mns1:low_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_cal><mns1:high_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_cal><mns1:low_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_rating><mns1:high_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_rating><mns1:low_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_time><mns1:high_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_time><mns1:low_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_dif><mns1:high_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_dif><mns1:low_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fat><mns1:high_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fat><mns1:low_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_carb><mns1:high_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_carb><mns1:low_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fib><mns1:high_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fib><mns1:low_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_pro><mns1:high_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_pro><mns1:low_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_col><mns1:high_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_col><mns1:low_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_sod><mns1:high_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_sod><mns1:low_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_created_at><mns1:high_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_created_at><mns1:low_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_hits><mns1:high_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_hits></SOAP-ENV:Body></SOAP-ENV:Envelope>'

        var data = "";
        if (cat != "" && cat != null)
            data = data + "id_category=" + cat;
        else if (keyword != "" && keyword != null)
            data = data + "keywords=" + keyword;

        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: urlConexion + '?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

                //json= JSON.parse(data);

                var updatedData = {
                    "recetas": data.data
                };

                RecipesGlobal.length = 0;
                for (var i = 0; i < updatedData.recetas.length; i++) {
                    RecipesGlobal.push(updatedData.recetas[i]);

                }

                paintRecipes(column, updatedData);
                return updatedData;
            }
        });

    } catch (ex) {
        alert(ex.description)
    }
}

var idReceta;
function seleccionarReceta(idRecetaSeleccionada, i) {


    activeView = "view_detalles";
    initView("view_detalles");
    if (User.id == "")
    {
        $("#favoritosBtn").attr("onclick", "mostrarMensajeError('Debe iniciar sesión para poder agregar esta receta a sus favoritos.')");
    } else {
        recipeIsInFavorites = isInFavorites(idRecetaSeleccionada);
        if (recipeIsInFavorites)
        {
            $("#favoritosBtn").css("background-image", "url('images/RemoveFavorites.png')");
            $("#favoritosBtn").attr("onclick", "eliminarFavoritosPreview(+" + idRecetaSeleccionada + ")");
        }
        else
        {
            $("#favoritosBtn").css("background-image", "url('css/images/AddFavorites.png')");
            $("#favoritosBtn").attr("onclick", "agregarFavoritos(" + idRecetaSeleccionada + ")");
        }
    }
    obtenerPuntuacion(idRecetaSeleccionada)


    //isInDetailView = true;
    //isClicked = false;

    getDetails(parseInt(idRecetaSeleccionada));

    idReceta = parseInt(idRecetaSeleccionada);
    cancelarSeleccion(idRecetaSeleccionada);

    $('#receta_' + idRecetaSeleccionada).removeClass('detalle-receta-seleccionada');

}
