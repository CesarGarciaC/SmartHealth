function mostrarMensajeError(msg)
{
    //alert("¡???")
    $().toastmessage('showErrorToast', msg);
}

function mostrarMensajeInformativo(msg)
{
    $().toastmessage('showSuccessToast', msg);
}
