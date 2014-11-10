var contIzq = 0;
var numTipo=7;
function colorIzquierdo() {
    var i;
    if (contIzq % numTipo == 0) {
        i = 0;
        contIzq++;
    }
    else if (contIzq % numTipo == 1) {
        i = 1;
        contIzq++;
    }
    else if(contIzq % numTipo == 2){
        i=2;
        contIzq++;
    }
    else if(contIzq % numTipo == 3){
        i=3;
        contIzq++;
    }
    else if(contIzq % numTipo == 4){
        i=4;
        contIzq++;
    }
    else if(contIzq % numTipo == 5){
        i=5;
        contIzq++;
    }
    else if(contIzq % numTipo == 6){
        i=6;
        contIzq++;
    }
    
    document.getElementById("bloque-left").style.backgroundImage = "url(css/images/prueba" + i + "fondo.png)";
    }
var contCen = 0;
function colorCentro() {
    var i;
    if (contCen % numTipo == 0) {
        i = 0;
        contCen++;
    }
    else if (contCen % numTipo == 1) {
        i = 1;
        contCen++;
    }
    else if(contCen % numTipo == 2){
        i=2;
        contCen++;
    }
    else if(contCen % numTipo == 3){
        i=3;
        contCen++;
    }
    else if(contCen % numTipo == 4){
        i=4;
        contCen++;
    }
    else if(contCen % numTipo == 5){
        i=5;
        contCen++;
    }
    
    else if(contCen % numTipo == 6){
        i=6;
        contCen++;
    }
    document.getElementById("bloque-center").style.backgroundImage = "url(css/images/prueba" + i + "Fondo.png)";
   }
var contDer = 0;
function colorDerecho() {
    var i;
    if (contDer % numTipo == 0) {
        i = 0;
        contDer++;
    }
    else if(contDer % numTipo == 1){
        i=1;
        contDer++;
    }
    else if(contDer % numTipo == 2){
        i=2;
        contDer++;
    }
    else if(contDer % numTipo == 3){
        i=3;
        contDer++;
    }
    else if(contDer % numTipo == 4){
        i=4;
        contDer++;
    }
    else if(contDer % numTipo == 5){
        i=5;
        contDer++;
    }
    else if(contDer % numTipo == 6){
        i=6;
        contDer++;
    }
    document.getElementById("bloque-right").style.backgroundImage = "url(css/images/prueba" + i + "Fondo.png)";
}

