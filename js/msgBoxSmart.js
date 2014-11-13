function mostrarMensajeError(msg)
{
    $().toastmessage('showErrorToast', msg);
}

function mostrarMensajeInformativo(msg)
{
    $().toastmessage('showSuccessToast', msg);
}

function mostrarMensajeAdvertencia(msg)
{
    $().toastmessage('showWarningToast', msg);
}


var toastMsg;
var nombreFuncion;
function mostrarMensajePregunta(msg,nFuncion)
{    
    toastMsg=$().toastmessage('showToast', {
       text     : msg,
       sticky   : true,
       position : 'top-right',
       type     : 'warning',
    });
    
    nombreFuncion=nFuncion;
    var p=$(".toast-type-warning").html()
    p+="<input id='btnAceptToast' type='button' value='Aceptar' style='margin-left: 50px;margin-top: 10px;border-right-width: 10px;margin-right: 10px;'>"
    p+="<input id='btnCancelToast' type='button' value='Cancelar' style='margin-left: 0px;margin-top: 10px;'>"
    $(".toast-type-warning").html(p)
}

$("#btnCancelToast").live("click",function()
{
    $().toastmessage('removeToast',toastMsg)
})

$("#btnAceptToast").live("click",function()
{
    eval(nombreFuncion);
    $().toastmessage('removeToast',toastMsg)
})
