


function mostrarCategories()
{

    $("#search-advanced").hide();
    busquedaRecetas(2);
    $(".resultado-recetas").css("width","70%");
	$(".resultado-recetas").css("height","70%");
	$(".resultado-recetas").css("float","left"); 
	$(".resultado-recetas").css("left","47px"); 
	$("#categorias-menu").show();
	$("#listaCategoriasNoBusqueda").hide();
	$("#listaCategoriasBusquedaAvanzada").show();
	

}

function getCategories(isFiltroAvanzado)
{
	
    try
    {
        //var data_category='<mns1:id_category xmlns:mns1="http://www.dreamsolutions.com/sexy_service/">'+cat+'</mns1:id_category>'
        //var webServiceURL='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/sexy_service.wsdl';
        //var soapRequest='<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.dreamsolutions.com/sexy_service/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><SOAP-ENV:Body>'+data_category+'<mns1:keyword xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:keyword><mns1:low_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_cal><mns1:high_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_cal><mns1:low_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_rating><mns1:high_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_rating><mns1:low_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_time><mns1:high_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_time><mns1:low_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_dif><mns1:high_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_dif><mns1:low_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fat><mns1:high_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fat><mns1:low_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_carb><mns1:high_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_carb><mns1:low_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fib><mns1:high_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fib><mns1:low_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_pro><mns1:high_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_pro><mns1:low_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_col><mns1:high_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_col><mns1:low_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_sod><mns1:high_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_sod><mns1:low_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_created_at><mns1:high_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_created_at><mns1:low_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_hits><mns1:high_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_hits></SOAP-ENV:Body></SOAP-ENV:Envelope>'

        var data = 'parent_name=smarttv';
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=smartGetCategories&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
				if(isFiltroAvanzado){paintCategoriesFiltroAvanzado(data);}
				else{paintCategories(data);}
 
            }
        });

    } catch (ex) {
        alert(ex.description)
    }
}

function paintCategories(categories){

	var targetdiv = $('#listaCategoriasNoBusqueda');
	var catDiv='<li><a id="cat1" class="last" value="" onclick="busquedaRecetas(2,null, null)"><span>Todos</span></a></li>';
	for(var i=0;i<categories.data.length;i++){
		catDiv+='<li><a id="cat'+(i+2)+'" class="selector s3" class="last" value='+categories.data[i].id+' onclick="busquedaRecetas(2,'+categories.data[i].id+', null)"><span>'+categories.data[i].name+'</span></a></li>';
	}
	targetdiv.html(catDiv);

}

function paintCategoriesFiltroAvanzado(categories){

	var targetdiv = $('#listaCategoriasBusquedaAvanzada');
	var catDiv='<li><a data-id="-1" class="selector s3" class="last"><span>Todos</span></a></li>';
	for(var i=0;i<categories.data.length;i++){
		catDiv+='<li><a data-id="'+categories.data[i].id+'" class="selector s3" class="last" value="'+categories.data[i].id+'"><span>'+categories.data[i].name+'</span></a></li>';
	}
	targetdiv.html(catDiv);

}