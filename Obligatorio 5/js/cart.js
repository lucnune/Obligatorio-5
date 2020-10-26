var itemsCarrito = {};
var itemActual;
var subtotalFinal;
var total;
var opcionEnvio = 0;
var invalidos;

function calcularTotales(){
    let camposPrecio = document.getElementsByClassName("total");
    let cantidad = document.getElementsByClassName("cantidad");
    subtotalFinal = 0;
    let cantidadArticulos = 0;
    for (let i = 0; i < camposPrecio.length; i++){
        let subtotal = parseInt(itemsCarrito.articles[i].unitCost) * parseInt(cantidad[i].value);
        camposPrecio[i].innerHTML = subtotal;
        cantidadArticulos += parseInt(cantidad[i].value);
        if (itemsCarrito.articles[i].currency === "UYU"){
            subtotalFinal += Math.ceil(subtotal / 40);
        } else {
            subtotalFinal += subtotal;
        }
    }
    document.getElementById("subtotalCompra").innerHTML = subtotalFinal;
    document.getElementById("cantidadArticulos").innerHTML = cantidadArticulos;
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
}

function mostrarItems(){
    let htmlContentToAppend = "";
    for(let i = 0; i < itemsCarrito.articles.length; i++){
        itemActual = itemsCarrito.articles[i];
        htmlContentToAppend +=`
            <div class="row align-items-center list-group-item-action">
                <div class="col-1">
                    <img src="` + itemActual.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <h3>` + itemActual.name + `</h3>
                </div>
                <div class="col-2">
                    <h4>`+ itemActual.currency + ` ` + itemActual.unitCost + `</h4>
                </div>
                <div class="col-2">
                    <input class="cantidad" type="number" size="3" onchange="calcularTotales()" min="0" value="` + itemActual.count + `">
                </div>
                <div class="col-2">
                    <h4><strong>` + itemActual.currency + ` <span class="total"></span></strong></h4>
                </div>
            </div>
            <hr class="my-3">
        `;
    }
    document.getElementById("carritoItems").innerHTML = htmlContentToAppend;
    calcularTotales();
}

function borrarArticulo(num){
    itemsCarrito.articles.splice(num, 1);
    mostrarItems();
}

function calcularTotalFinal(num){
    switch(num){
        case 0:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
        break;
        case 1:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.07);
        break;
        case 2:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.05);
        break;
        default: 
    }
}

/*Confirma domicilio*/
function noEnvio(){
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal);
}

function confirmarDireccion(){
    var elementos_direccion = document.getElementsByClassName("direccionForm");
    invalidos = 0;

    for (let i = 0; i < elementos_direccion.length; i++){
        if (elementos_direccion[i].value === "" || elementos_direccion[i].value === "Elegir..."){
            elementos_direccion[i].classList.add("is-invalid");
            elementos_direccion[i].classList.remove("is-valid");
        } else {
            elementos_direccion[i].classList.add("is-valid");
            elementos_direccion[i].classList.remove("is-invalid");
        }
    }

    for (let i = 0; i < elementos_direccion.length; i++){
        if (elementos_direccion[i].classList.contains("is-invalid")){
            invalidos = invalidos + 1;
        }
    }

    if (invalidos){
        alert("Debe llenar todos los campos.");
    } 
}

/*Confirma pago*/
function envioActivo(num){
    opcionEnvio = num;
    switch(opcionEnvio){
        case 0:
            var elemento_transferencia = document.getElementsByClassName("transferenciaForm");
            elemento_transferencia[0].classList.remove("is-valid");
            elemento_transferencia[0].classList.remove("is-invalid");
        break;
        case 1:
            var elementos_pago = document.getElementsByClassName("tarjetaForm");
            for (let i = 0; i < elementos_pago.length; i++){
                elementos_pago[i].classList.remove("is-valid");
                elementos_pago[i].classList.remove("is-invalid");
            }
        break;
    }
}


function confirmarEnvio(){
    switch(opcionEnvio){
        case 0:
            var elementos_pago = document.getElementsByClassName("tarjetaForm");
            invalidos = 0;
        
            for (let i = 0; i < elementos_pago.length; i++){
                if (elementos_pago[i].value === ""){
                    elementos_pago[i].classList.add("is-invalid");
                    elementos_pago[i].classList.remove("is-valid");
                } else {
                    elementos_pago[i].classList.add("is-valid");
                    elementos_pago[i].classList.remove("is-invalid");
                }
            }
        
            for (let i = 0; i < elementos_pago.length; i++){
                if (elementos_pago[i].classList.contains("is-invalid")){
                    invalidos = invalidos + 1;
                }
            }
        
            if (invalidos){
                alert("Complete todos los campos.");
            } else {
                $('#modalEnvio').modal('hide');
            } 
        break;
        case 1:
            var elemento_transferencia = document.getElementsByClassName("transferenciaForm");
            var j = 0;
            if (elemento_transferencia[j].value === ""){
                elemento_transferencia[j].classList.add("is-invalid");
                elemento_transferencia[j].classList.remove("is-valid");
            } else {
                elemento_transferencia[j].classList.add("is-valid");
                elemento_transferencia[j].classList.remove("is-invalid");
            }

            if (elemento_transferencia[j].classList.contains("is-invalid")){
                alert("Complete todos los campos.");
            } else {
                $('#modalEnvio').modal('hide');
            }
        break;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        itemsCarrito = resultObj.data;

        mostrarItems();
    });
});