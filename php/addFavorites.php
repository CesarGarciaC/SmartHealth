<?php

try {

$id_user=null;
$id_recipe=null;

if (isset($_GET['id_user'])) 
{
	$id_user = $_GET['id_user'];
}

if (isset($_GET['id_recipe'])) 
{
	$id_recipe=$_GET['id_recipe'];
}

$client = new SoapClient('http://200.16.7.111/wordpress/index.php?/wpws/?wsdl');


$response = $client->smartAddFavService($id_user,$id_recipe);

$jsonFile= json_encode($response,true);


print_r ($jsonFile);


} catch (Exception $e) {

printf("Message = %s ",$e->__toString());

}

?>