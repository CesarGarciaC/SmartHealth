//Variables Globales
var numbuttons=4;

var data2={
	"recetas":[
		{
			"id":"01",
			"nombre":"Batido de Fresa",
			"palabras_clave":["fresa","batido","desayuno"],
			"categorias":["1","2","5"],
			"instrucciones":["En una batidora, combinar leche, pl�tano y fresas. Agregar vainilla y az�car de manera opcional. Bator hasta obtener la consistencia deseada. Verter en vasos y servir."],
			"imagen":"01_batido_fresas.jpg",
			"video":"",
			"evaluaci�n":"4.5",
			"porciones": 2,
			"calorias":236,
			"num_usuarios":832,
			"tiempo": 5,
			"link":"http://allrecipes.com/recipe/strawberry-oatmeal-breakfast-smoothie/"
		},
		{
			"id":"02",
			"nombre":"Langostinos Szechwan",
			"palabras_clave":["langostinos","mariscos","szechwan"],
			"categorias":["6"],
			"instrucciones":["En un bowl, mezclar agua, ketchup, salsa de soya, maicena, miel, pimienta roja molida y jengibre. Dejar reservado.","Calentar aceite en una sart�n grande a fuego medio-alto. Poner cebollas y ajo y cocinar por 30 segundos. Agregar los langostinos y revolver para cubrir con aceite. Agregar a la salsa y cocinar revolviendo hasta que la salsa se encuentre burbujeando y espese."],
			"imagen":"02_langostinos_szechwan.jpg",
			"video":"",
			"evaluaci�n":"4.5",
			"porciones": 4,
			"calorias":142,
			"num_usuarios":2393,
			"tiempo": 20,
			"link":"http://allrecipes.com/recipe/szechwan-shrimp/"
		},
		{
			"id":"03",
			"nombre":"Quiche de tofu y espinaca sin huevo",
			"palabras_clave":["tofu","espinaca","quiche","vegetariano"],
			"categorias":["2","5","8"],
			"instrucciones":["Precalentar el horno a 175 grados Celcius.",
							"En una batidora, combinar el tofu y la leche; procesar hasta que est� cremoso a�adiendo m�s leche de ser necesario. A�adir sal y pimienta.",
							"En un bowl mediano, combinar espinaca, ajo, cebolla, queso cheddar, queso suizo y la mezcla de tofu. Mezclar bien y poner en un molde de pie preparado.",
							"Cocinar en el horno precalentado por 30 minutos o hasta que est� dorado en la superficie. Dejar reposar por 5 minutos antes de cortar."],
			"imagen":"03_quiche_tofu.jpg",
			"video":"",
			"evaluaci�n":"4.5",
			"porciones": 6,
			"calorias":288,
			"num_usuarios":152,
			"tiempo": 45,
			"link":"http://allrecipes.com/recipe/eggless-tofu-spinach-quiche/"
		},
		{
			"id":"04",
			"nombre":"Ensalada de Feta y Col Rizada",
			"palabras_clave":["feta","col","ensalada","vegetariano"],
			"categorias":["2","3","5","1"],
			"instrucciones":["Mezclar la col con sal en un bowl por 2 minutos. Poner vinagre sobre la col y revolver. Trozar manzana, queso feta y pi�ones a la col."],
			"imagen":"04_ensalada_feta_kale.jpg",
			"video":"",
			"evaluaci�n":"5",
			"porciones": 8,
			"calorias":43,
			"num_usuarios":832,
			"tiempo": 15,
			"link":"http://allrecipes.com/Recipe/Kale-and-Feta-Salad/"
		},
		{
			"id":"05",
			"nombre":"Estofado de carne",
			"palabras_clave":["carne","estofado"],
			"categorias":["4"],
			"instrucciones":["En una olla grande, cocinad la carne en aceite a fuego lento hasta que est� cocida. Disolver caldo en agua y verterlo en la olla. Esparcir romero, perejil y pimienta. Llevar a punto de ebullici�n y luego reducir la temperatura, cubrir la olla y cocer por 1 hora.",
							"Poner papas, zanahorias, apio y cebolla dentro de la olla. Disolver maicena en 2 cucharaditas de agua fr�a y echar al estofado. Cubrir y dejas cocinar por 1 hora m�s."],
			"imagen":"05_estofado.jpg",
			"video":"",
			"evaluaci�n":"4.5",
			"porciones": 10,
			"calorias":401,
			"num_usuarios":1790,
			"tiempo": 140,
			"link":"http://allrecipes.com/Recipe/Beef-Stew-VI/"
		},
		{
			"id":"06",
			"nombre":"Keke de pl�tano",
			"palabras_clave":["pl�tano","keke"],
			"categorias":["3"],
			"instrucciones":["Precalentar el horno a 175 grados Celcius. Engrasar un poco una sart�n de 9x5 pulgadas.",
							"En un bowl grande, combinar la harina, el polvo de hornear y la sal. En un bowl separado, mezclar la mantequilla y el az�car rubia. Agregar los huevos y las bananas hasta que se encuentre bien mezclado. Unir la mezcla de las bananas y harina. Poner mantequilla en la sart�n preparado.",
							"Cocinar en el horno precalentado de 60 a 65 minutos. Dejar enfriar en el molde por 10 minutos, luego voltearlo en otro recipiente."],
			"imagen":"06_banana_bread.jpg",
			"video":"",
			"evaluaci�n":"4.5",
			"porciones": 8,
			"calorias":229,
			"num_usuarios":10506,
			"tiempo": 80,
			"link":"http://allrecipes.com/Recipe/Banana-Banana-Bread/"
		}
	]

}

  
var categorias2={
	"categorias":[ 
		
		{
			"id":1,
			"nombre":"Bebidas",
			"descripcion":""
		},
		{
			"id":2,
			"nombre":"Entrada",
			"descripcion":""
		},
		{
			"id":3,
			"nombre":"Fondo",
			"descripcion":""
		},
		{
			"id":4,
			"nombre":'Postre',
			"descripcion":""
		},
		{
			"id":5,
			"nombre":"Vegano",
			"descripcion":""
		},
		{
			"id":6,
			"nombre":"Vegetariano",
			"descripcion":""
		}
	]

}


var RecipesGlobal =new Array();


$(document).ready($(function () 
  {
  
	
  	var updatedData=busquedaRecetas(3,"","");
	//alert(RecipesGlobal[0].name);
	//paintRecipes(3);
 
  })); 
  
  function sleep(millis, callback) {
    setTimeout(function() { callback(); }, millis);
  }

  function paintRecipes(numColumns, data2){
	var targetdiv=$('#resultadoRecetas')
    var recetaDiv="<table>";
    for ( var i=0; i<data2.recetas.length; i++ ) {
		if(i%numColumns==0)	recetaDiv+='<tr>'
        recetaDiv+= '<td><div id="receta_'+i+'" class="detalle-receta">';
		var puntuacion='<div id="star_'+i+'" class="rating">&nbsp;</div>';
		var textoReceta='<div id=textReceta_'+i+' class="texto-detalle"><p>'+data2.recetas[i].name+'</p></div>';
		var imagenReceta='<div id=imagenReceta_'+i+' class="imagen-detalle"><img src="data:image/jpg;base64,'+data2.recetas[i].image+'" width="82 "height="76"></div>';
		recetaDiv+=puntuacion+textoReceta+imagenReceta;
		recetaDiv+='</div></td>';
		if(i%numColumns==numColumns-1) recetaDiv+='</tr>'
    }
	recetaDiv+='</table>';
	targetdiv.html(recetaDiv);
	
	for ( var i=0; i<data2.recetas.length; i++ ){
		$('#star_'+i).rating('votar.php', {maxvalue: 5, curvalue:1, id:20});
		$('#receta_'+i).mouseover(function(){
			$(this).addClass('detalle-receta-seleccionada');			
		});
		$('#receta_'+i).mouseout(function(){
			$(this).removeClass('detalle-receta-seleccionada');			
		});
	}
  
  }


  
    function busquedaRecetas(column, cat, keyword)
  {
  try
  {

	//var data_category='<mns1:id_category xmlns:mns1="http://www.dreamsolutions.com/sexy_service/">'+cat+'</mns1:id_category>'
	//var webServiceURL='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/sexy_service.wsdl';
	//var soapRequest='<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.dreamsolutions.com/sexy_service/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><SOAP-ENV:Body>'+data_category+'<mns1:keyword xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:keyword><mns1:low_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_cal><mns1:high_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_cal><mns1:low_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_rating><mns1:high_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_rating><mns1:low_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_time><mns1:high_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_time><mns1:low_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_dif><mns1:high_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_dif><mns1:low_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fat><mns1:high_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fat><mns1:low_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_carb><mns1:high_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_carb><mns1:low_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fib><mns1:high_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fib><mns1:low_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_pro><mns1:high_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_pro><mns1:low_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_col><mns1:high_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_col><mns1:low_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_sod><mns1:high_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_sod><mns1:low_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_created_at><mns1:high_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_created_at><mns1:low_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_hits><mns1:high_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_hits></SOAP-ENV:Body></SOAP-ENV:Envelope>'

	var data="";
	if(cat!="")	data=data+"id_category="+cat;
	else if(keyword!="") data=data+"keyword="+keyword;

    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({      	
	  
      url: 'php/getRecipes.php',                  //the script to call to get data          
      data: data,                        //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
      dataType: 'json',                //data format    
	  async: false,
      success: function(data)          //on recieve of reply
      {
        json= JSON.parse(data);	
		var updatedData= {
			"recetas":json
		};
		
		for(var i=0;i<updatedData.recetas.length;i++){
			RecipesGlobal.push(updatedData.recetas[i]);
			//alert(RecipesGlobal[i].name);
		}
		
		paintRecipes(column,updatedData);
		return updatedData;		
      } 
    });
    
  }catch(ex){
	alert(ex.description)
	}
  }
  

  
  function mouseOver() {
    alert('Holi');
}
  