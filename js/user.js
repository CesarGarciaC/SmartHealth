///Iniciación usuario
var User = new UserData("", "", "");


/*cadVariables = location.search.substring(1, location.search.length);
arrVariables = cadVariables.split("&");
if (arrVariables.length > 1) {
    User = new UserData(arrVariables[0], arrVariables[1], arrVariables[2]);
}*/

function userLogin(id, nicename, email) {
    User = new UserData(id,nicename,email);
    
}


//////////////Objeto Usuario/////////
function UserData(id, nicename, email) {
    this.id = id;
    this.nicename = nicename;
    this.email = email;
}

