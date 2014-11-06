function mostrarMensajeError(msg)
{
    $().toastmessage('showErrorToast', msg);
}

function mostrarMensajeInformativo(msg)
{
    $().toastmessage('showSuccessToast', msg);
}