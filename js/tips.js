
var event;
var tips=new Array();
function getEvents()
{	
    try
    {
        //var data_category='<mns1:id_category xmlns:mns1="http://www.dreamsolutions.com/sexy_service/">'+cat+'</mns1:id_category>'
        //var webServiceURL='http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/sexy_service.wsdl';
        //var soapRequest='<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.dreamsolutions.com/sexy_service/" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><SOAP-ENV:Body>'+data_category+'<mns1:keyword xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:keyword><mns1:low_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_cal><mns1:high_cal xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_cal><mns1:low_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_rating><mns1:high_rating xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_rating><mns1:low_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_time><mns1:high_time xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_time><mns1:low_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_dif><mns1:high_dif xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_dif><mns1:low_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fat><mns1:high_fat xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fat><mns1:low_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_carb><mns1:high_carb xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_carb><mns1:low_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_fib><mns1:high_fib xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_fib><mns1:low_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_pro><mns1:high_pro xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_pro><mns1:low_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_col><mns1:high_col xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_col><mns1:low_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_sod><mns1:high_sod xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_sod><mns1:low_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_created_at><mns1:high_created_at xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_created_at><mns1:low_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:low_hits><mns1:high_hits xmlns:mns1="http://www.dreamsolutions.com/sexy_service/"></mns1:high_hits></SOAP-ENV:Body></SOAP-ENV:Envelope>'
		event= new Array();
        var data = '';
        //-----------------------------------------------------------------------
        // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
        //-----------------------------------------------------------------------
        $.ajax({
            url: 'http://200.16.7.111/wordpress/wp-content/plugins/wordpress-web-service/includes/sexy_restful.php?method=getEvents&format=json&', //the script to call to get data          
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


function paintEventsTips(){

	getEvents();
	
	var targetdiv = $('#tabRight');
	var fbButton='<tr><td><button id="FacebookButton" onclick="facebookLayer()"><img src="images/Facebook_Logo.png" width=40 height=40> </button></td></tr>';
	var eventDiv='';
	for(var i=0;i<3;i++){

		try{
		var direccion=event[i].address;
		var lugar=direccion.split(",")[0];
		 eventDiv+='<tr><td><div class="detalleDiv"><p style="margin-bottom:10px; height:20%;">'+event[i].name+'</p>'+
		 '<p align="left" style="margin-bottom:5px">Fecha:&nbspHoli </p>' +
		 //'<p align="left" style="margin-bottom:5px">Hora: </p>' +
		 '<p align="left" style="margin-bottom:5px">Lugar:&nbsp&nbsp'+lugar+' </p></div>'+
		 '<p style="margin-left: 17px;margin-top: 1px; ">Evento</p></td></tr>';
		 }
		 catch(ex){
				eventDiv+='<tr><td><div class="detalleDiv" style="background: url(images/tip.jpg)"></div>'+
				'<p style="margin-left: 17px;margin-top: 1px; ">Consejo</p></td></tr>';
		 }
	}
	targetdiv.html(fbButton+eventDiv);	
}