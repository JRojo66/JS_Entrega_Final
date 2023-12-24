// AREA DE DEFINCION DE PRODUCTOS
//Tablas
let carrito = [];
let productos=[];
const localStorage = window.localStorage;

// Trae los productos del archivo JSON/productos.json
function ObtenerInformacionProductos(){
    return new Promise ((resolve,reject) => {
        fetch('../JSON/productos.json')
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
        mostrarProductos(informacionProductos) //crearCards(InformacionProductos) 
        productos = informacionProductos; //Asigna el array de objetos "productos" a la variable "productos"
    }catch(error){
        console.error("Error en la app :",error)
    }
}

main(); 
// Agrega los productos a la pagina en cards. La clase contenedora es cards. La clase de cada card es card

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

let elementosFiltrarCategorias = ["tabla", "vela"];

elementosFiltrarCategorias.forEach(elemento => { // Activa los EventListeners de los checkbox Categorias
    const elementoDOM = document.getElementById(elemento);
    elementoDOM.addEventListener("input", () => filtrarProductos());
});

let elementosFiltrarSubcategorias = ["wave","freewave","freestyle","foil","race","freerace","freeride","youth","trainer"];

elementosFiltrarSubcategorias.forEach(elemento => { // Activa los EventListeners de los checkbox Subcategorias
    const elementoDOM = document.getElementById(elemento);
    elementoDOM.addEventListener("input", () => filtrarProductos());
});

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

    if(clave1.value!=""){
        productosFiltrados3 = productosFiltrados2.filter(producto => 
        producto.articulo.toLowerCase().includes(clave1.value.toLowerCase())||producto.descripcion.toLowerCase().includes(clave1.value.toLowerCase())
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
    carrito.push({ articulo, precio}); // Agrega el elemento correspondiente al boton de Agregar al Carrito en el array carrito
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
    let contenedor = document.getElementById("carrito"); // Guarda el elemento con el Id="carrito" en la variable contenedor
    contenedor.innerHTML = `<p id="carrito"class="textoCarrito">Carrito</p>`; // Vacía el carrito y vuelve a poner el título
    carrito.map(function(producto){ // Recorre el array de carrito con un map. Cumple con la consigna de utilizar MAP.
        const {articulo, precio} = producto; // Desestructura el contenido del carrito. Cumple la consigna de desestructurar.
        contenedor = document.createElement("div");        
        contenedor.innerHTML = ""; // Vacía el contenedor
        contenedor.innerHTML = `<h1> ${articulo}</h1>
                                <b> u$s ${precio}</b>
                                <button class="btn btn-primary" onclick="quitarDelCarrito('${articulo}', ${precio})">Quitar del Carrito</button><br>`; //Define el innerHTML del elemento con una plantilla de texto// Agrega cada elemento del array carrito al contenido de la variable contenedor             
        contenedor.className += "cardcarrito"; // Agrega la clase a la variable contenedor
        document.getElementById("carrito").appendChild(contenedor); // Agrega la variable contenedor al elemento del carrito
        });
        contenedorb = document.getElementById("totalCarrito"); // Guarda el elemento con el Id="totalCarrito" en la variable contenedor 
        contenedorb.innerHTML = `<p>Total Carrito: u$s ${totalCarrito()}</p><br>` // Agrega el total del carrito
        let contenedorc = document.getElementById("vaciaCarrito"); // Agrega el boton de Checkout
        contenedorc.innerHTML = `<button class="btn btn-primary" onclick="vaciaCarrito()">Vaciar el carrito</button><br>`
       let contenedord = document.getElementById("checkOut"); // Agrega el boton de Checkout
        contenedord.innerHTML = `<button class="btn btn-primary" onclick="Checkout()">Checkout</button><br>`
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

function Checkout(){ // Abre la ventana de Chekout (no desarrollada, abre la homepage de Goya)
    // Abrir nuevo tab
    let win = window.open('https://goyawindsurfing.com/', '_blank');
    win.focus();    
    guardarCarritoEnElLocalStorage();
    mostrarCarrito(carrito) // Muestra el carrito con el producto ya eliminado
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













