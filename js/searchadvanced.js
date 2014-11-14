var selector1=false;
var selector2=false;
var selector3=false;
var colorButtonSelector="orange";
var numColumns=3;

//Valores para criterios de busqueda
var value_s1;
var value_s2;
var value_s3=-1;
var dataFiltrada=null;
var flagFiltroCalorias=false;
function mostrarAvanzada()
{
  activeView = "view_busqueda";
	
	var keyword=$('#keyboard')
	var bool=$("#categorias-menu ").is(":visible");
//	if(bool)	numColumns=2;
//	else		numColumns=3;
        numColumns=2;
//	alert("keyword: "+keyword.val());
	busquedaRecetas(numColumns,"",keyword.val());
    $("#search-advanced").show();
    $("#categorias-menu").show();
    $("#listaCategoriasNoBusqueda").hide();
    $("#listaCategoriasBusquedaAvanzada").show();
    $(".resultado-recetas").css("height","55%");
	$(".resultado-recetas").css("width","70%");
	$(".resultado-recetas").css("left","47px");
    $("#categorias-menu ").css("height","#1CC2EC 0px 0px 18px 6px");   
    flagFiltroCalorias=true;
}

function filtrar()
{
    var t=RecipesGlobal.length;
    if (selector3)
    {
        for (i=0;i<t;i++)
        {
              for (c=0;c<RecipesGlobal[i].categories.length;c++)
              {
                  if (value_s3==RecipesGlobal[i].categories[c].id)
                      dataFiltrada.push(RecipesGlobal[i]);
              }
              
        }
    }
    else
    {
        for (i=0;i<t;i++)
            dataFiltrada.push(RecipesGlobal[i]);
        
    }
    
    if (selector1)
    {
          switch(value_s1)
          {
              //Mejor valoradas
              case 1:
                  {
                      dataFiltrada.sort(function(a,b){return b.rating - a.rating});
                      break;
                  }
                  
              //Recientes
              case 2:
                  {
                      dataFiltrada.sort(function(a,b){return a.created_at - b.created_at});
                      break;
                  }
                  
              //Tiempo elaboracion
              case 3:
                  {

                      dataFiltrada.sort(function(a,b){return a.time - b.time});
                      break;
                  }
                  
              //Dificultad
              case 4:
                  {

                      dataFiltrada.sort(function(a,b){return a.difficulty - b.difficulty});
                      break;
                  }
          }
    } 
//    actualizarResultados();
    var dataF={
        "recetas":dataFiltrada
    };
    paintRecipes(2,dataF);
	
	$(".resultado-recetas").css("width","70%");
	$(".resultado-recetas").css("left","47px");
};

function actualizarResultados()
{
    var targetdiv=$('#resultadoRecetas')
    targetdiv.css("width","75%");
    var recetaDiv="<table>";
    for ( var i=0; i<dataFiltrada.length; i++ ) {
        if(i%numColumns==0)	recetaDiv+='<tr>'
        recetaDiv+= '<td><div id="receta_'+i+'" class="detalle-receta">';
        var puntuacion = '<div style="float:left; margin-bottom:20px;" class="basicNoEditable" data-average="' + dataFiltrada[i].rating + '"data-id="' + dataFiltrada[i].id + '"></div>';
        var textoReceta='<div id=textReceta_'+i+' class="texto-detalle"><p>'+dataFiltrada[i].name+'</p></div>';
        var imagenReceta='<div id=imagenReceta_'+i+' class="imagen-detalle"><img src="data:image/jpg;base64,'+dataFiltrada[i].image+'" width="82 "height="76"></div>';
        recetaDiv+=puntuacion+textoReceta+imagenReceta;
        recetaDiv+='</div></td>';
        if(i%numColumns==numColumns-1) recetaDiv+='</tr>'
    }
    
    recetaDiv+='</table>';
    targetdiv.html(recetaDiv);
	for ( var i=0; i<data2.recetas.length; i++ ){
		
		//$('#star_'+i).rating('votar.php', {maxvalue: 5, curvalue:1, id:20});
		$('#receta_'+i).mouseover(function(){
			$(this).addClass('detalle-receta-seleccionada');

		});
		$('#receta_'+i).mouseout(function(){
			$(this).removeClass('detalle-receta-seleccionada');	
			

		});	
		$('#receta_'+i).mousedown(function(){
			
			
			if(selectedRecipe.length){
				var idDelete = selectedRecipe.split("_")[1];
				var idActual=$(this).attr("id").split("_")[1];
				if(idDelete!=idActual)				
					cancelarSeleccion(idDelete);
			}
			
			if($('#select_'+this.id).length){}
			else{	
				selectedRecipe=this.id;
				var newdiv = document.createElement('div');
				newdiv.setAttribute('id','select_'+this.id);
				newdiv.setAttribute('class','submenu');
				
				var id = $(this).attr("id").split("_")[1];
				
				document.getElementById(this.id).appendChild(newdiv);
				$('#select_'+this.id).html('<button id="botonFav_'+this.id+'">Favoritos +</button>'
										+'<button id="botonVer_'+this.id+'" onclick="seleccionarReceta('+id+')">Ver</button>'
										+'<button id="botonCan_'+this.id+'" onclick="cancelarSeleccion('+id+')" >Cancelar</button>');
			
										
			}
		});	
	}
}


$(".selector").live('click',function()
{
    //selector de orden
    dataFiltrada=new Array()
    if ($(this).hasClass("s1"))
    {
        if (!selector1)
        {
            /*$(this).css("background-color",colorButtonSelector);*/
            $(this).parent().addClass("selected");
            selector1=true;
        }
        else
        {
           /*$(".s1").css("background-color","");
           $(this).css("background-color",colorButtonSelector);*/
           $(".s1").parent().removeClass("selected");
           $(this).parent().addClass("selected");
        }
        value_s1=$(this).data("order-option");
    }
    
    //Selector de categorias
//    alert($(this).data("id"))
    if (($(this).hasClass("s3")))
    {
        if (!selector3)
        {
            /*$(this).css("background-color",colorButtonSelector);*/
            $(this).parent().addClass("selected");
            selector3=true;
        }
        else
        {
           /*$(".s3").css("background-color","");
           $(this).css("background-color",colorButtonSelector);*/
           $(".s3").parent().removeClass("selected");
           $(this).parent().addClass("selected");

        }
        
        value_s3=$(this).data("id");
        
        if (($(this).data("id")==-1))
            selector3=false;
        
    }
    filtrar();
})

function filtrarCalorias(min, max)
{
    var dataFiltroCalorias=new Array();
    if (max=="") max=999999999;
    if (min=="") min=0;
    if (dataFiltrada!=null)
    {
        for (i=0;i<dataFiltrada.length;i++)
        {
            if ((dataFiltrada[i].calories<max) && (dataFiltrada[i].calories>=min))
                dataFiltroCalorias.push(dataFiltrada[i]);
        }
        
        var dataF={
            "recetas":dataFiltroCalorias
        };
        paintRecipes(2,dataF);
    }
}
