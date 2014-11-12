function mostrarMensajeError(msg)
{
    $().toastmessage('showErrorToast', msg);
}

function mostrarMensajeInformativo(msg)
{
    $().toastmessage('showSuccessToast', msg);
//    $().toastmessage('showSuccessToast', {
//       text     : msg,
//       stayTime   : 10000
//    });
}

function mostrarMensajeAdvertencia(msg)
{
    $().toastmessage('showWarningToast', msg);
}
