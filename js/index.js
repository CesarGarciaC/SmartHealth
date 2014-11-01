//Variables Globales
var numbuttons = 4;

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

$(document).ready($(function()
{     /////////////////////////////Nombre usuario al iniciar sesion////////
    if (User.id != "") {
        var targetdiv = $('#Usuario');
        var UserDiv = "<center><img src=\"images/user.png\">" + User.nicename + "</center>" + "<center id=\"CloseSesion\" onclick=\"CloseSesion()\">Cerrar Sesión</center>";
        targetdiv.html(UserDiv);
    }
    else
    {
        $("#menuFavoritos").removeAttr('onclick')
        
    }

    var updatedData = busquedaRecetas(3, "", "");


}));

function CloseSesion() {
    if (confirm("¿Seguro desea cerrar la sesión? \n Recetas favoritas y las opciones de compartir y valorar recetas no estaras disponibles.")) {
        var targetdiv = $('#Usuario');
        var UserDiv = "<a href=\"login.html\">Iniciar Sesión</a>";
        targetdiv.html(UserDiv);
        User= new UserData("", "", "");
    }

}

function sleep(millis, callback) {
    setTimeout(function() {
        callback();
    }, millis);
}

function paintRecipes(numColumns, data2) {

    var targetdiv = $('#resultadoRecetas')
    if (numColumns==2) targetdiv.css("width","75%");
    var recetaDiv = "<table>";
    for (var i = 0; i < data2.recetas.length; i++) {
        if (i % numColumns == 0)
            recetaDiv += '<tr>'
        recetaDiv += '<td><div id="receta_' + i + '" value="receta_' + data2.recetas[i].id + '" class="detalle-receta">';
        var puntuacion = '<div style="float:left; margin-bottom:20px;" class="basicNoEditable" data-average="' + parseInt(data2.recetas[i].rating/data2.recetas[i].raters) + '"data-id="' + data2.recetas[i].id + '"></div>';
        var textoReceta = '<div id=textReceta_' + i + ' class="texto-detalle"><p>' + data2.recetas[i].name + '</p></div>';
        var imagenReceta = '<div id=imagenReceta_' + i + ' class="imagen-detalle"><img src="data:image/jpg;base64,' + data2.recetas[i].image + '" width="82 "height="76"></div>';
        recetaDiv += puntuacion + textoReceta + imagenReceta;
        recetaDiv += '</div></td>';
        if (i % numColumns == numColumns - 1)
            recetaDiv += '</tr>'
    }

    recetaDiv += '</table>';
    targetdiv.html(recetaDiv);

    for (var i = 0; i < data2.recetas.length; i++) {

        //$('#star_'+i).rating('votar.php', {maxvalue: 5, curvalue:1, id:20});
        $('#receta_' + i).mouseover(function() {
            $(this).addClass('detalle-receta-seleccionada');

        });
        $('#receta_' + i).mouseout(function() {
            $(this).removeClass('detalle-receta-seleccionada');


        });
        $('#receta_' + i).mousedown(function() {


            if (selectedRecipe.length) {
                var idDelete = selectedRecipe.split("_")[1];
                var idActual = $(this).attr("id").split("_")[1];
                if (idDelete != idActual)
                    cancelarSeleccion(idDelete);
            }

            if ($('#select_' + this.id).length) {
            }
            else {
                selectedRecipe = this.id;
                var newdiv = document.createElement('div');
                newdiv.setAttribute('id', 'select_' + this.id);
                newdiv.setAttribute('class', 'submenu');

                var id = $(this).attr("value").split("_")[1];

                document.getElementById(this.id).appendChild(newdiv);
                var btnFav='<button id="botonFav_' + this.id + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos +</button>';
                if (User.id=="")
                    btnFav='<button disabled="true" id="botonFav_' + this.id + '" onclick="agregarFavoritosPreview(' + id + ')">Favoritos +</button>';
                
                $('#select_' + this.id).html(btnFav
                        + '<button id="botonVer_' + this.id + '" onclick="seleccionarReceta(' + id + ')">Ver</button>'
                        + '<button id="botonCan_' + this.id + '" onclick="cancelarSeleccion(' + id + ')" >Cancelar</button>');


            }
        });
    }
    reloadRating();

}

$(document).click(function(event) {
	if(selectedRecipe!=''){
		if (!$(event.target).is('#' + selectedRecipe)) {
			var idDelete = selectedRecipe.split("_")[1];
			cancelarSeleccion(idDelete);
		}
	}
})

function cancelarSeleccion(idDiv) {
    var mainDiv = document.getElementById('receta_' + idDiv);
    var deleteDiv = document.getElementById('select_receta_' + idDiv);
    mainDiv.removeChild(deleteDiv);
    selectedRecipe = '';
}

function busquedaRecientes() {

    try
    {
		$("#search-advanced").hide();
		$("#categorias-menu").hide();
		$(".resultado-recetas").css("width","95%");
		$(".resultado-recetas").css("height","70%");
		$(".resultado-recetas").css("left","20px");
        var data = "";
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

                data.data.sort(function(a, b) {
                    return new Date(b.created_at) - new Date(a.created_at)
                });

                var updatedData = {
                    "recetas": data.data
                };
                var today = new Date();
                var lastTwoMonths = new Date(today.setMonth(today.getMonth() - 1));

                var RecipesLastTwoMonths = new Array();
                for (var i = 0; i < updatedData.recetas.length; i++) {
                    if (new Date(updatedData.recetas[i].created_at) > lastTwoMonths)
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

    try
    {
		$("#search-advanced").hide();
		$("#categorias-menu").hide();
		$(".resultado-recetas").css("width","95%");
		$(".resultado-recetas").css("height","70%");
		$(".resultado-recetas").css("left","20px");
        var data = "";
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGeneralSearchService&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {

                data.data.sort(function(a, b) {
                    return new Date(b.rating/b.raters) - new Date(a.rating/a.raters)
                });

                var updatedData = {
                    "recetas": data.data
                };

                var RecipesLastTop10 = new Array();
                for (var i = 0; i < 10; i++) {
                        RecipesLastTop10.push(updatedData.recetas[i]);
                }
                var RecipesGet = {
                    "recetas": RecipesLastTop10
                };

                paintRecipes(3, RecipesGet);
                return updatedData;
            }
        });

    } catch (ex) {
        alert(ex.description)
    }

}

function busquedaRecetas(column, cat, keyword)
{

	
    try
    {
        //var data_category='<mns1:id_category xmlns:mns1="http://www.dreamsolutions.com/sexy_service/">'+cat+'</mns1:id_category>'
        //var webServiceURL='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/sexy_service.wsdl';
        //var soapRequest='<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.dreamsolutions.com/sexy_service/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><SOAP-ENV:Body>'+data_category+'<mns1:keyword xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:keyword><mns1:low_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_cal><mns1:high_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_cal><mns1:low_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_rating><mns1:high_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_rating><mns1:low_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_time><mns1:high_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_time><mns1:low_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_dif><mns1:high_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_dif><mns1:low_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fat><mns1:high_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fat><mns1:low_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_carb><mns1:high_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_carb><mns1:low_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fib><mns1:high_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fib><mns1:low_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_pro><mns1:high_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_pro><mns1:low_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_col><mns1:high_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_col><mns1:low_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_sod><mns1:high_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_sod><mns1:low_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_created_at><mns1:high_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_created_at><mns1:low_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_hits><mns1:high_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_hits></SOAP-ENV:Body></SOAP-ENV:Envelope>'

        var data = "";
        if (cat != "" && cat != null)
            data = data + "id_category=" + cat;
        else if (keyword != "" && keyword != null)
            data = data + "keyword=" + keyword;

        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGeneralSearchService&format=json&', //the script to call to get data          
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
