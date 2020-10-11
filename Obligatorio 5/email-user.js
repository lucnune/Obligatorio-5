const usernav = document.getElementById('usernav');

let username = JSON.parse(localStorage.getItem('user'));

if(username != null){
    usernav.innerHTML= '<a href="#" id="close" class="nav-item nav-link active">'+username[0].usernav+'</a>';

};