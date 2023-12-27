// AREA DE DEFINCION DE PRODUCTOS
//Tablas
let carrito = [];
let productos=[];
let pedidos = [];
let elementosFiltrarCategorias = [];
let elementosFiltrarSubcategorias = [];
const localStorage = window.localStorage;



// Trae los productos del archivo JSON/productos.json
function ObtenerInformacionProductos(){
    return new Promise ((resolve,reject) => {
        fetch('./JSON/productos.json')
        .then(response=>{
            if(!response.ok){
                throw new Error("Error al cargar la API, comunicate con el administrador");
            }
            return response.json();
        })
        .then(data=>resolve(data))
        .catch(error=>reject(error));
    })
}
// Crea los cards con la informacion de JSON/productos.json
async function main(){
    try{
        const informacionProductos = await ObtenerInformacionProductos()
        productos = informacionProductos; //Asigna el array de objetos "productos" a la variable "productos"
        mostrarProductos(informacionProductos) //crearCards(InformacionProductos)
        productos = informacionProductos; //Asigna el array de objetos "productos" a la variable "productos"
        crearCategorias();
        let contenedor = document.createElement("div");  // Crea un elemento div en una variable
        contenedor.innerHTML = `<br>`; //Define el innerHTML del elemento con un break
        document.getElementById("buscadores").appendChild(contenedor); // Agrega el elemento en la seccion de buscadores
        crearSubcategorias();
    }
    catch(error){
        console.error("Error en la app :",error)
    }
    finally{
        Toastify({ // Toast productos cargados
            text: `Estos son los productos disponibles`,
            duration: 3000,
            gravity: 'top',
            position: 'center'
        }).showToast();
    }
}

main();
// Agrega los productos a la pagina en cards. La clase contenedora es cards. La clase de cada card es card

crearCategorias = () => {
    elementosFiltrarCategorias = [...new Set(productos.map(producto => producto.categoria.toLowerCase()))];//Genera un array con las categorias
    elementosFiltrarCategorias.forEach(elemento => { 
        let contenedor = document.createElement("div");  // Crea un elemento div en una variable
        contenedor.innerHTML = `<input type="checkbox" id=${elemento} class="cbox" value="first_checkbox"> ${elemento}</input>`; //Define el innerHTML del elemento con una plantilla de texto
        document.getElementById("buscadores").appendChild(contenedor); // Agrega el elemento en la seccion de buscadores
        const elementoDOM = document.getElementById(elemento); // Activa los EventListeners para las categorias creadas
        elementoDOM.addEventListener("input", () => filtrarProductos());
    });
}

crearSubcategorias = () => {
    elementosFiltrarSubcategorias = [...new Set(productos.map(producto => producto.subcategoria.toLowerCase()))];//Genera un array con las categorias
    elementosFiltrarSubcategorias.forEach(elemento => { 
        let contenedor = document.createElement("div");  // Crea un elemento div en una variable
        contenedor.innerHTML = `<input type="checkbox" id=${elemento} class="cbox" value="first_checkbox"> ${elemento}</input>`; //Define el innerHTML del elemento con una plantilla de texto
        document.getElementById("buscadores").appendChild(contenedor); // Agrega el elemento en la seccion de buscadores
        const elementoDOM = document.getElementById(elemento); // Activa los EventListeners para las subcategorias creadas
        elementoDOM.addEventListener("input", () => filtrarProductos());
    });
}


function mostrarProductos(productos) { // Muestra los productos en la seccion Productos
    document.body.appendChild(document.createElement("div")) // Agrega un div en el DOM
productos.map(function(producto){ // Recorre el array de productos con un map. Cumple con la consigna de utilizar MAP.
        let contenedor = document.createElement("div");  // Crea un elemento div en una variable
        contenedor.innerHTML = `<h1> ${producto.articulo}</h1>
                                <h2>  ${producto.descripcion}</h2>
                                <img src="${producto.foto}" class="foto" alt="Imagen de ${producto.articulo}">
                                <br><br>
                                <b> u$s ${producto.precio}</b>
                                <br>
                                <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.articulo}', ${producto.precio})">Agregar al Carrito</button><br>`; //Define el innerHTML del elemento con una plantilla de texto

        contenedor.className += "card";
        document.getElementById("Productos").appendChild(contenedor);
    });
}


mostrarProductos(productos)

// AREA DE FILTRADO DE PRODUCTOS
// Llama a la funcion filtrar productos cuando el usuario escribe en el cuadro de dialogo de buscar producto o selecciona un checkbox


let clave1 = document.getElementById("buscadorProducto"); // buscador
clave1.addEventListener("input",filtrarProductos);


function filtrarProductos(){


    // Area de definicion de variables para filtrarProductos
    let productosFiltrados = {};
    let productosFiltrados2 = {};
    let productosFiltrados3 = [];
    let categoriasSeleccionadas = false;
    let subcategoriasSeleccionadas = false;
    let productosFiltradosAcCategorias = [];
    let productosFiltradosAcSubcategorias = [];

    // Los filtros de productos funcionan en tres niveles en cascada. Primero se filtra por categorias. El resultado se filtra por subcategorias, y este segundo resultado se filtra por el texto ingresado

    // Primer nivel de filtro: por categoria

    elementosFiltrarCategorias.forEach(elemento => { // Trae los Checkbox de las Subcategorias
    const checkbox = document.getElementById(elemento.toLowerCase());

    if (checkbox.checked) { // Si hay algun checkbox marcado
        const productosFiltradosCategoria = productos.filter(producto => // Filtra por la subcategoria correspondiente
            producto.categoria.toLowerCase() === elemento.toLowerCase()
        );
        productosFiltradosAcCategorias = [...productosFiltradosAcCategorias, ...productosFiltradosCategoria]; // Almacena los productos filtrados en un Acumulador
        categoriasSeleccionadas = true; // Avisa que hay alguna subcategoria seleccionada
    }
    });

    // Si hay alguna subcategoria seleccionada carga el acumulador de productos seleccionados, si no hay categorias seleccionadas, muestra todos los productos
    categoriasSeleccionadas? productosFiltrados = productosFiltradosAcCategorias: productosFiltrados = productos


    // Segundo nivel de filtro: por subcategoria

    elementosFiltrarSubcategorias.forEach(elemento => { // Trae los Checkbox de las Subcategorias
    const checkbox = document.getElementById(elemento.toLowerCase());

    if (checkbox.checked) { // Si hay algun checkbox marcado
        const productosFiltradosSubcategoria = productosFiltrados.filter(producto => // Filtra por la subcategoria correspondiente
            producto.subcategoria.toLowerCase() === elemento.toLowerCase()
        );
        productosFiltradosAcSubcategorias = [...productosFiltradosAcSubcategorias, ...productosFiltradosSubcategoria]; // Almacena los productos filtrados en un Acumulador
        subcategoriasSeleccionadas = true; // Avisa que hay alguna subcategoria seleccionada
    }
    });

    // Si hay alguna subcategoria seleccionada, carga el acumulador de productos seleccionados, si no hay subcategorias seleccionadas, muestra todos los productos
    subcategoriasSeleccionadas? productosFiltrados2 = productosFiltradosAcSubcategorias: productosFiltrados2 = productosFiltrados


    // Tercer nivel de filtro: Por texto

    if(clave1.value!=""){ // Filtra por texto
        productosFiltrados3 = productosFiltrados2.filter(producto =>
        producto.articulo.toLowerCase().includes(clave1.value.toLowerCase())||producto.descripcion.toLowerCase().includes(clave1.value.toLowerCase()) // Cumple la consigna de uso del operador ||
    );
    } else {
        productosFiltrados3 = productosFiltrados2;
    }

    const contenedor = document.getElementById("Productos");
    contenedor.innerHTML = ""; // Limpiar el contenedor
    mostrarProductos(productosFiltrados3);
}


// AREA DE CARRITO
let sumaDePrecios = 0;

function cargarCarritoDelLocalStorage() { // Carga el carrito desde el LocalStorage
    let carritoJson = localStorage.getItem("carrito"); // Carga la variable carrito Json desde el carrito almacenado en el LocalStorage
    if (carritoJson !== null) { // Chequea que el carrito no está vacío
       carrito = JSON.parse(carritoJson); // Si el carrito no está vacío, lo carga con el carrito almacenado en el LocalStorage
    }
    mostrarCarrito(carrito) // Llama a la función que muestra el carrito
}

cargarCarritoDelLocalStorage() // Llama a la funcion que carga el carrito desde el LocalStorage

function guardarCarritoEnElLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(articulo, precio) { //Agrega los elementos al carrito
    const indice = carrito.findIndex(producto => producto.articulo === articulo); // Busca si el elemento existe en el carrito
    if (indice === -1) { // Si no existe
        cantidad = 1; 
        carrito.push({ articulo, precio, cantidad}); // Agrega un elemento al carrito
    } else { // Si existe
        carrito[indice].cantidad += 1; // Suma uno a la cantidad existente
        Toastify({ // Toast el producto ya existía
            text: `El producto ${articulo} ya existía en el carrito! Se sumo una unidad`,
            duration: 3000,
            gravity: 'top',
            position: 'right'
        }).showToast();
    }
    mostrarCarrito(carrito) // llama a la funcion mostrarCarrito
    guardarCarritoEnElLocalStorage()
    Toastify({ // Toast agregaste articulo al carrito
        text: `Agregaste ${articulo} al carrito!`,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();
}

function mostrarCarrito(carrito) { // Muestra los productos en la seccion carrito
    const cantidadItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    let contenedor = document.getElementById("carrito"); // Guarda el elemento con el Id="carrito" en la variable contenedor
    contenedor.innerHTML = `<div class="contenedorCarrito"><img src="images/shopping-cart.png" id="carrito" class="Carrito"><p class="cantidadItems">${cantidadItems}</p></div>`; // Vacía el carrito y vuelve a poner el título
    carrito.map(function(producto){ // Recorre el array de carrito con un map. Cumple con la consigna de utilizar MAP.
        const {articulo, precio, cantidad} = producto; // Desestructura el contenido del carrito. Cumple la consigna de desestructurar.
        contenedor = document.createElement("div");
        contenedor.innerHTML = ""; // Vacía el contenedor
        if(cantidad!==1){
            contenedor.innerHTML = `<h1> ${articulo}</h1>
                                    <b> u$s ${precio} - cantidad: ${cantidad}</b>
                                    <div class="masmenos">
                                        <div>
                                            <button id="mas" onclick="agregaItem(${carrito.indexOf(producto)})">+</button>
                                            <button id="menos" onclick="restaItem(${carrito.indexOf(producto)})">-</button>
                                        </div>
                                    <div>
                                        <button class="btn btn-primary" onclick="quitarDelCarrito('${articulo}', ${precio}, ${cantidad})">Quitar del Carrito</button><br>
                                    </div>`; //Define el innerHTML del elemento con una plantilla de texto/. Agrega cada elemento del array carrito al contenido de la variable contenedor. Agrega los botones + y -
        } else{
            contenedor.innerHTML = `<h1> ${articulo}</h1>
                                    <b> u$s ${precio} - cantidad: ${cantidad}</b>
                                    <div class="masmenos">
                                        <div>
                                            <button id="mas" onclick="agregaItem(${carrito.indexOf(producto)})">+</button>
                                        </div>
                                    <div>
                                        <button class="btn btn-primary" onclick="quitarDelCarrito('${articulo}', ${precio}, ${cantidad})">Quitar del Carrito</button><br>
                                    </div>`; //Define el innerHTML del elemento con una plantilla de texto/. Agrega cada elemento del array carrito al contenido de la variable contenedor. Agrega los botones + y -
        }
        contenedor.className += "cardcarrito"; // Agrega la clase a la variable contenedor
        document.getElementById("carrito").appendChild(contenedor); // Agrega la variable contenedor al elemento del carrito
        });
        let contenedorb = document.getElementById("totalCarrito"); // Guarda el elemento con el Id="totalCarrito" en la variable contenedor
        contenedorb.innerHTML = `<p>Total Carrito: u$s ${totalCarrito()}</p><br>` // Agrega el total del carrito
        let contenedorc = document.getElementById("vaciaCarrito"); // Agrega el boton de Checkout
        contenedorc.innerHTML = `<div class="centrarBoton"><button class="btn btn-primary" onclick="vaciaCarrito()">Vaciar el carrito</button><br></div>`
       let contenedord = document.getElementById("checkOut"); // Agrega el boton de Checkout
        contenedord.innerHTML = `<div class="centrarBoton"><button class="btn btn-primary" onclick="Checkout()">Checkout</button><br></div>`
}

function vaciaCarrito(){ // Vacia el carrito
    carrito = []; // Vacia el carrito
    guardarCarritoEnElLocalStorage(); // lo guarda en el LocalStorage
    mostrarCarrito(carrito) // Muestra el carrito con el producto ya eliminado
    Toastify({ // Toast vaciaste el carrito
        text: `Vaciaste el carrito!`,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();
}

function Checkout(){ // Abre el formulario de Checkout cuando se selecciona Checkout
    let formulario = document.getElementById("miFormulario")
    formulario.addEventListener("input",desplegarFormulario())
}

function desplegarFormulario(){ // Muestra el formulario
    let formulario = document.getElementById("miFormulario");
    formulario.removeAttribute("hidden");
    formulario.addEventListener("submit", guardarDatos);
}

function guardarDatos(event){
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    if (!nombre || !email) { // valida que se hayan ingresado Nombre e email. 
        // Si nombre o email están vacíos, muestra un mensaje y no procesa el formulario
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        Toastify({
            text: "Por favor, ingresa un nombre válido con solo letras.",
            duration: 3000,
            gravity: "top",
            position: "right"
        }).showToast();
        return;
    }

    // Validación del correo electrónico (formato válido)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        Toastify({
            text: "Por favor, ingresa un correo electrónico válido.",
            duration: 3000,
            gravity: "top",
            position: "right"
        }).showToast();
        return;
    }
    pedidos.push(nombre,email,carrito); // Guarda el pedido en array
    event.target.reset();
    let formulario = document.getElementById("miFormulario");
    formulario.setAttribute("hidden", "true");
    localStorage.setItem("pedidos", JSON.stringify(pedidos)); // Guarda los pedidos en el localStorage
    Toastify({ // Toast pedido enviado
        text: `Tu pedido ha sido registrado, te contactaremos en breve!`,
        duration: 8000,
        gravity: 'top',
        position: 'right'
    }).showToast();
    vaciaCarrito(); // Vacia el carrito
}

function totalCarrito(){ // Calcula el precio total del carrito
    const sumaDePrecios = carrito.reduce((total, producto) => total + producto.precio, 0);
    return(sumaDePrecios);
}

function quitarDelCarrito(articulo) { //Quita los articulos del carrito
    const indice = carrito.findIndex(producto => producto.articulo === articulo);// Busca el articulo seleccionado para eliminar
    carrito.splice(indice, 1); // elimina el producto del carrito
    guardarCarritoEnElLocalStorage();
    mostrarCarrito(carrito) // Muestra el carrito con el producto ya eliminado
    Toastify({ // Toast quitaste el articulo del carrito
        text: `Quitaste ${articulo} del carrito!`,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();
}

function agregaItem(indice){
    carrito[indice].cantidad += 1; // Incrementa la cantidad en 1
    mostrarCarrito(carrito); // Actualiza la interfaz mostrando el carrito
    guardarCarritoEnElLocalStorage(); // Guarda el carrito actualizado en el LocalStorage
}

function restaItem(indice){
    if(carrito[indice].cantidad>1){
        carrito[indice].cantidad -= 1; // Incrementa la cantidad en 1
        mostrarCarrito(carrito); // Actualiza la interfaz mostrando el carrito
        guardarCarritoEnElLocalStorage(); // Guarda el carrito actualizado en el LocalStorage
    }
}













