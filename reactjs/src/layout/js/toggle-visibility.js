var visibilityToggle = document.getElementById('visibility');

var input = document.getElementById('txt-password');

var password = true;

visibilityToggle.onclick = function(){
    if (password == true){
        input.setAttribute('type', 'text');
    }else{
        input.setAttribute('type', 'password');
    }
    password=!password;
}
    
var visibilityToggle1 = document.getElementById('visibility1');

var input1 = document.getElementById('txt-password1');

var password1 = true;

visibilityToggle1.onclick = function(){
    if (password1 == true){
        input1.setAttribute('type', 'text');
    }else{
        input1.setAttribute('type', 'password');
    }
    password1=!password1;
}