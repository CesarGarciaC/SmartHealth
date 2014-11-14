
var event;
var tips;
function getEvents()
{	
    try
    {	
		event= new Array();
        var data = '';
        $.ajax({
            url: urlConexion+'?method=getEvents&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
				data.data.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
				for(var i=0;i<data.data.length;i++){
					event.push(data.data[i]);
				}				
            }
        });
    } catch (ex) {
        alert(ex.description)
    }
}

function getTips()
{	
    try
    {	
		tips=new Array();
			
        var data = '';
        $.ajax({
            url: urlConexion+'?method=getTips&format=json&', //the script to call to get data          
            data: data, //you can insert url argumnets here to pass to api.php                              //for example "id=5&parent=6"
            dataType: 'json', //data format    
            async: false,
            success: function(data)          //on recieve of reply
            {
				data.data.sort(function(a, b) {
                    return Math.random() - Math.random();
                });
				for(var i=0;i<data.data.length;i++){
					tips.push(data.data[i]);
				}				
            }
        });
    } catch (ex) {
        alert(ex.description)
    }
}

function paintEventsTips(){


	getEvents();
	getTips();
	
	var targetdiv = $('#tabRight');
	var fbButton='';//<tr><td><button id="FacebookButton" onclick="facebookLayer()"><img src="images/Facebook_Logo.png" width=40 height=40> </button></td></tr>';
	var eventDiv='';
	var tipDiv='';
	var addDiv='';
	var sep=-1;
	for(var i=0;i<3;i++){

		try{
		var date='';
		if(event[i].date==null)	date='Sin Fecha';
		else {
		date=event[i].date;
		var dateFormated=new Date(date);
		date=dateFormated.getUTCDate()+'/'+(dateFormated.getUTCMonth()+1)+'/'+dateFormated.getUTCFullYear();
		}

		var direccion=event[i].address;
		var lugar=direccion.split(",")[0];
		 eventDiv+='<tr><td><div class="detalleDiv" style="background: url(images/tipBackground.png)">'+
		 '<p style="margin-bottom:10px; height:28%;color: rgb(58,58,58);font-weight: bold;font-size: 16px;">'+event[i].name+'</p>'+
		 '<div style="text-align:left;float:left;margin-bottom:5px;">'+
		 '<p style="display: inline;margin-right:5px;font-weight: bold;font-size: 14px;">Fecha:</p>'+
		 '<p style="display: inline;margin-bottom:3px;font-size: 14px;">'+date+'</p></div><br>' +
		 //'<p align="left" style="margin-bottom:5px">Hora: </p>' +
		 '<div style="text-align:left;float:left;margin-bottom:5px;font-size: 14px;">'+
		 '<p style="display: inline;margin-right:6px;font-weight: bold;font-size: 14px;">Lugar:</p>'+
		 '<p style="display: inline;margin-bottom:3px;font-size: 14px;">'+lugar+' </p></div></div>'+
		 '<p style="margin-left: 17px;margin-top: 2px;font-weight: bold;font-size: 16px; ">Evento</p></td></tr>';
		 }
		 catch(ex){
			if(sep==-1)	sep=i;
			try{
				tipDiv+='<tr><td><div class="detalleDiv" style="background: url(images/tipBackground.png)">'+
				'<p style="margin-bottom:10px; height:28%;color: rgb(58,58,58);font-weight: bold;font-size: 14px;">'+tips[i-sep].name+'</p></div>'+
				'<p style="margin-left: 17px;margin-top: 2px;font-weight: bold;font-size: 16px; ">Consejo</p></td></tr>';
			}
			catch(ex2)
			{
				eventDiv+='<tr><td><div class="detalleDiv" style="background: url(images/tip.png)"></div>'+
				'<p style="margin-left: 17px;margin-top: 2px;font-weight: bold;font-size: 16px; ">Consejo</p></td></tr>';
			}
				
				
		 }
	}
	targetdiv.html(fbButton+eventDiv+tipDiv+addDiv);	
}
