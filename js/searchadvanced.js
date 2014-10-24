var selector1=false;
var selector2=false;
var selector3=false;
var colorButtonSelector="orange";
var numColumns=3;

//Valores para criterios de busqueda
var value_s1;
var value_s2;
var value_s3=-1;
var dataFiltrada;
function mostrarAvanzada()
{
	
	var keyword=$('#keyboard')
	var bool=$("#categorias-menu ").is(":visible");
	if(bool)	numColumns=2;
	else		numColumns=3;
	busquedaRecetas(numColumns,"",keyword.val());
    $("#search-advanced").show();
    $(".resultado-recetas").css("height","40%");
    $("#categorias-menu ").css("height","#1CC2EC 0px 0px 18px 6px");   
}

function filtrar()
{
    //Filtrar por categorias
//    var t=data2.recetas.length;

    var t=RecipesGlobal.length;
    if (selector3)
    {
        for (i=0;i<t;i++)
        {
            //alert(jQuery.inArray(value_s3+"",data2.recetas[i].categorias)+" "+value_s3+" "+data2.recetas[i].categorias)
//              if (jQuery.inArray(value_s3+"",data2.recetas[i].categorias)>=0)
//              {
//                  dataFiltrada.push(data2.recetas[i]);
//              }
              
//              if (jQuery.inArray(value_s3+"",RecipesGlobal[i].categories.id)>=0)
//              {
//                  dataFiltrada.push(RecipesGlobal[i]);
//              }
              
              for (c=0;c<RecipesGlobal[i].categories.length;c++)
              {
                  if (value_s3==RecipesGlobal[i].categories[c].id)
                      dataFiltrada.push(RecipesGlobal[i]);
              }
              
        }
    }
    else
    {
//        for (i=0;i<t;i++)
//            dataFiltrada.push(data2.recetas[i]);
        
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

                      dataFiltrada.sort(function(a,b){return a.rating - b.rating});
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
    
//    if ((cal_min.val()!=null) && (cal_max.val()!=null))
//    {
//        if (!(selector1 || selector2))
//            dataFiltrada=data2;
//        
//        for (i=0;i<dataFiltrada.length;i++)
//        {
//            var calorias=dataFiltrada.recetas[i].calorias;
//            if ((calorias>cal_max.val()) || (calorias<cal_min.val()))
//                dataFiltrada.remo
//        }
//    }
    
    actualizarResultados();
}

function actualizarResultados()
{   
    var targetdiv=$('#resultadoRecetas')
    var recetaDiv="<table>";
    for ( var i=0; i<dataFiltrada.length; i++ ) {
        if(i%numColumns==0)	recetaDiv+='<tr>'
        recetaDiv+= '<td><div id="receta_'+i+'" class="detalle-receta">';
        var puntuacion='<div id="star_'+i+'" class="rating">&nbsp;</div>';
        var textoReceta='<div id=textReceta_'+i+' class="texto-detalle"><p>'+dataFiltrada[i].name+'</p></div>';
        var imagenReceta='<div id=imagenReceta_'+i+' class="imagen-detalle"><img src="data:image/jpg;base64,'+dataFiltrada[i].image+'" width="82 "height="76"></div>';
        recetaDiv+=puntuacion+textoReceta+imagenReceta;
        recetaDiv+='</div></td>';
        if(i%numColumns==numColumns-1) recetaDiv+='</tr>'
    }
    
    recetaDiv+='</table>';
    targetdiv.html(recetaDiv);

    for ( var i=0; i<dataFiltrada.length; i++ ){
            $('#star_'+i).rating('votar.php', {maxvalue: 5, curvalue:1, id:20});
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
            $(this).css("background-color",colorButtonSelector);
            selector1=true;
        }
        else
        {
           $(".s1").css("background-color","");
           $(this).css("background-color",colorButtonSelector);
        }
        value_s1=$(this).data("order-option");
    }
    
    //Selector de categorias
    if ($(this).hasClass("s3"))
    {
        if (!selector3)
        {
            $(this).css("background-color",colorButtonSelector);
            selector3=true;
        }
        else
        {
           $(".s3").css("background-color","");
           $(this).css("background-color",colorButtonSelector);

        }
        
        value_s3=$(this).data("id");
    }
    filtrar();
})

