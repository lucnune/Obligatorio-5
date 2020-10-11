//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsCarrito = {};
var itemActual;
var subtotalFinal;
var total;

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
function mostrarDireccion(mostrar){
    if (mostrar){
        document.getElementById("direccion").innerHTML=`
        <form>
            <div class="form-group">
                <label for="inputAddress">Dirección</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="Dirección..." required>
            </div>
            <div class="form-group">
                <label for="inputAddress2">Info adicional dirección</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Numero de puerta..." required>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputCity">Ciudad</label>
                    <input type="text" class="form-control" id="inputCity" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputState">Departamento</label>
                    <select id="inputState" class="form-control">
                        <option selected>Elegir...</option>
                        <option>Artigas</option>
                        <option>Canelones</option>
                        <option>Colonia</option>
                        <option>Durazno</option>
                        <option>Florida</option>
                        <option>Fray Bentos</option>
                        <option>Maldonado</option>
                        <option>Mercedes</option>
                        <option>Melo</option>
                        <option>Minas</option>
                        <option>Montevideo</option>
                        <option>Paysandú</option>
                        <option>Rivera</option>
                        <option>Rocha</option>
                        <option>Salto</option>
                        <option>San José</option>
                        <option>Tacuarembó</option>
                        <option>Treinta y Tres</option>
                        <option>Trinidad</option>
                    </select>
                </div>
            </div>
        </div>
    </form>`;
    } else {
        document.getElementById("direccion").innerHTML="";
        document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal);
    }
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        itemsCarrito = resultObj.data;

        mostrarItems();
    });
});