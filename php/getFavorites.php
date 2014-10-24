<?php

try {

$id_user=null;

if (isset($_GET['id_user'])) 
{
	$id_user = $_GET['id_user'];
}

$client = new SoapClient('http://200.16.7.111/wordpress/index.php?/wpws/?wsdl');


$response = $client->smartSearchFavService($id_user);

$jsonFile= json_encode($response,true);


print_r ($jsonFile);


} catch (Exception $e) {

printf("Message = %s ",$e->__toString());

}

?>