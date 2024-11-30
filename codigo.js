
let carros = []
let compras = []
const myToast = new bootstrap.Toast(document.getElementById('liveToast'));

let carro = {
   modelo : '',
   marca : '',
   cilindraje : '',
   imagen : '',
   precio : 0,

}



let cajita = document.getElementById('numero')

function registro(){
    agregarcarro()
    limpiar()
   
}

function comprasvehiculo(pos) {
    const producto = carros[pos];
    const itemExistente = compras.find(item => item.modelo === producto.modelo && item.marca === producto.marca);

    if (itemExistente) {
        // Incrementar la cantidad si el producto ya existe
        itemExistente.cantidad++;
    } else {
        // Agregar un nuevo producto al carrito con cantidad inicial 1
        compras.push({ ...producto, cantidad: 1 });
    }

    let carrito = document.getElementById('carrito');
    carrito.innerText = compras.reduce((total, item) => total + item.cantidad, 0); // Totalizar el número de productos

    document.getElementById('mensajetoast').innerText = "Compra realizada con éxito ...";
    myToast.show();
    console.log(compras);
}

function agregarcarro(){
      carro.modelo     =   document.getElementById('modelo').value
      carro.marca      =   document.getElementById('marca').value
      carro.cilindraje =   document.getElementById('cilindraje').value
      carro.imagen     =   document.getElementById('imagen').value
      carro.precio     =   parseInt(document.getElementById('precio').value)
      carros.push({...carro})
     
      document.getElementById('mensajetoast').innerText = "Registro guardado con exito ..."
      myToast.show();
      limpiar();
}



function limpiar() {
    let marca = document.getElementById('marca')
    marca.value = ''
     document.getElementById('modelo').value = ''
    document.getElementById('cilindraje').value = 0
    document.getElementById('imagen').value = ''
    document.getElementById('precio').value = 0
    marca.focus()
}

function visualizarcatalogo(){
    let tarjetas = `<div class="row">`
    for(pos in carros){
       let data = carros[pos]
      tarjetas +=   `<div class="col-3">
                        <div class="card " style="width: 18rem;">
                           
                                <img src=${data.imagen} class="card-img-top imagen" alt="...">
                            
                           
                             <div class="card-body">
                                 <h5 class="card-title">${data.marca}</h5>
                                 <p <span >Modelo : ${data.modelo}</span>
                                 <span >Cilindraje : ${data.cilindraje}</span></p>
                                 <button onclick="comprasvehiculo(${pos})">$ ${data.precio}</button>
                             </div>
                       </div></div>`
    }
    tarjetas += "</div>"
    document.getElementById('catalogo').innerHTML = tarjetas

}


function visualizardatos(){
    let tabla = `<table class="table table-dark table-hover" border='1'>
       <thead>
         <th>MARCA</th>
         <th>MODELO</th>
         <th>CILINDRAJE</th>
         <th>PRECIO</th>
         <th>IMAGEN</th>
        </thead>`
     for(data of carros){
      tabla += `<tr>
                  <td>${data.marca}</td>
                  <td>${data.modelo}</td>
                  <td>${data.cilindraje}</td>
                  <td>${data.precio}</td>
                  <td><img src="${data.imagen}" class="imagen"></td>
                </tr>`
  }
  tabla += `</table>`
  document.getElementById('datos').innerHTML = tabla

}




const modalFactura = document.getElementById('factura');
modalFactura.addEventListener('show.bs.modal', actualizarModal);

function actualizarModal() {
    // Actualizar cantidad total en el modal
    document.getElementById('cantidad').innerText = compras.reduce((total, item) => total + item.cantidad, 0);

    // Construir el detalle de la factura
    let detalleFactura = '';
    let total = 0;

    compras.forEach((compra, index) => {
        detalleFactura += `
            <div class="row mb-3 align-items-center">
                <div class="col-3">
                    <img src="${compra.imagen}" alt="${compra.marca}" class="img-fluid rounded">
                </div>
                <div class="col-6">
                    <h5>${compra.marca} - ${compra.modelo}</h5>
                    <p>Cilindraje: ${compra.cilindraje}</p>
                    <p>Precio unitario: $${compra.precio}</p>
                    <p>Cantidad: ${compra.cantidad}</p>
                </div>
                <div class="col-3 d-flex align-items-center">
                    <button class="btn btn-success btn-sm me-2" onclick="incrementarCantidad(${index})">+</button>
                    <button class="btn btn-danger btn-sm" onclick="disminuirCantidad(${index})">-</button>
                </div>
            </div>
            <hr>
        `;
        total += compra.precio * compra.cantidad;
    });

    // Insertar los detalles en el contenedor del modal
    document.getElementById('detalle-factura').innerHTML = detalleFactura;

    // Actualizar el total
    document.getElementById('total').innerText = total;
}

function incrementarCantidad(index) {
    compras[index].cantidad++;
    actualizarModal(); // Actualizar el modal tras modificar cantidades
}

function disminuirCantidad(index) {
    if (compras[index].cantidad > 1) {
        compras[index].cantidad--;
    } else {
        // Eliminar el producto si la cantidad es 0
        compras.splice(index, 1);
    }
    actualizarModal(); // Actualizar el modal tras modificar cantidades

    // Actualizar el icono del carrito en tiempo real
    let carrito = document.getElementById('carrito');
    carrito.innerText = compras.reduce((total, item) => total + item.cantidad, 0);
}

