function actualizarVolver(){
	switch(lastWindow.window){
		case 'Top10':
			busquedaTop10();
			break;
		case 'Novedades':
			busquedaNovedades();
			break;
		case 'Favoritos':
			obtenerFavoritos();
			break:
		case 'Categorias':
			break;
		case 'Busqueda':
			break;
		default:
			busquedaTop10();
			break;
	}
}