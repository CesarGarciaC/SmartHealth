<?php

try {

$id_user_searchfav=null;

if (isset($_GET['id_user_searchfav'])) 
{
	$id_user_searchfav = $_GET['id_user_searchfav'];
}

$client = new SoapClient('http://200.16.7.111/wordpress/index.php?/wpws/?wsdl');


$response = $client->smartSearchFavService($id_user_searchfav);

$jsonFile= json_encode($response,true);


print_r ($jsonFile);


} catch (Exception $e) {

printf("Message = %s ",$e->__toString());

}

?>