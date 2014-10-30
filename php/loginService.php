<?php
try {
        $username=null;
        $password=null;      
        
        if (isset($_GET['username'])) 
            {
                $username = $_GET['username'];
            }
            
        if (isset($_GET['password'])) 
            {
                $password=$_GET['password'];
            }
        
        $client = new SoapClient('http://200.16.7.111/wordpress/index.php?/wpws/?wsdl');
        
        $params = array('username'=>$username, 'password'=>$password);
        
        $response = $client->__soapCall("loginService",$params);
        
        $jsonFile= json_encode($response,true);


print_r ($jsonFile);


} catch (Exception $e) {
    
   
printf("Message = %s ",$e->__toString());
 
   
/*$file = file_get_contents('login.html'); //cargo el archivo
$file = str_ireplace('{error}', "prueba", $file); //tomo {titulo} y lo reemplazo por lo que quiera
echo "hola";*/
}
        
        ?>
