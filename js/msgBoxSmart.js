function mostrarMensajeError(msg)
{
    $().toastmessage('showErrorToast', msg);
}

function mostrarMensajeInformativo(msg)
{alert("ss=\n\ss")
//    $().toastmessage('showSuccessToast', msg);
    $().toastmessage('showSuccessToast', {
       text     : 'Helloooo',
       stayTime   : 10000,
    });
}

function mostrarMensajeAdvertencia(msg)
{
    $().toastmessage('showWarningToast', msg);
}
