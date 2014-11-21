function actualizarVolver(){

	switch(lastWindow.windows){
		case 'Top10':

			busquedaTop10();
			break;
		case 'Novedades':

			busquedaNovedades();
			break;
		case 'Favoritos':

			obtenerFavoritos();
			break;
		case 'Categoria':

			//mostrarCategories();
			//value_s3=lastWindow.categories;
			//filtrar();
			break;
		case 'Busqueda':
			//mostrarAvanzada();
			//value_s3=lastWindow.categories;
			//filtrar();
			break;
		default:
			busquedaTop10();
			break;
	}
}