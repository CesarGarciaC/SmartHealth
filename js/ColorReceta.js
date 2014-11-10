var cont = 0;
var numTipoReceta=4;
function colorReceta() {
    var i;
    if (cont % numTipoReceta == 0) {
        i = 0;
        cont++;
        document.getElementById("recipe-details").style.backgroundImage = "url(css/images/prueba" + i + "receta.png)";
    
    }
    else if (cont % numTipoReceta == 1) {
        i = 1;
        cont++;
        document.getElementById("recipe-details").style.backgroundImage = "url(css/images/prueba" + i + "receta.png)";
    
    }
    else if(cont % numTipoReceta == 2){
        i=2;
        cont++;
        document.getElementById("recipe-details").style.backgroundImage = "url(css/images/prueba" + i + "receta.png)";
    
    }
    else if(cont % numTipoReceta == 3){
        i=0;
        cont++;
         document.getElementById("recipe-details").style.backgroundImage = "url(css/images/prueba" + i + "fondo.png)";
    
    }
    
    
    }