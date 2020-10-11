//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function () {
    form = document.forms[0];

    form.addEventListener('submit', onSubmit);
});

function onSubmit(event) {
    event.preventDefault();

    email = document.getElementById('email-input').value;
    pass = document.getElementById('pass-input').value;

    if (email === '' || pass === '') {
        alert('Los campos son requeridos');
    } else {
        sessionStorage.setItem('loggedEmail', email);
        window.location = 'index.html';
    }
}