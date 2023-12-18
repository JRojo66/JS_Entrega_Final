// AREA DE DEFINCION DE PRODUCTOS
//Tablas

// Area de definicion de variables
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

// Area de filtrado de productos
// Los filtros de productos funcionan en tres niveles en cascada. Primero se filtra por categorias. El resultado se filtra por subcategorias, y este segundo resultado se filtra por el texto ingresado 

// Llama a la funcion filtrar productos cuando el usuario escribe en el cuadro de dialogo de buscar producto o selecciona un checkbox




    // Area de definicion de variables para filtrarProductos
    let productosFiltradosCategorias = {};
    let productosFiltrados = {};
    let productosFiltrados1 = {};
    let productosFiltrados2 = {}; 
    let productosFiltradosSubcategorias = [];
    let productosFiltradosWave = [];
    let productosFiltradosFreewave = [];
    let productosFiltrados4 = [];
    let productosFiltradosb = [];
    let productosFiltradosAc = [];  

    let elementosFiltrarCategorias = ["Tabla","Vela","Wave","Freewave","Freestyle","Foil","Race","Freerace","Freeride","Youth","Trainer"]  
    let elementosFiltrarSubcategorias = ["Wave","Freewave","Freestyle","Foil","Race","Freerace","Freeride","Youth","Trainer"];

elementosFiltrarCategorias.forEach(elemento => { // Agrega los EventListeners para cuando se selecciona/deselecciona un Checkbox de Categoría
    const elementoDOM = document.getElementById(elemento);
    elementoDOM.addEventListener("input", () => filtrarProductos());
});

let clave1 = document.getElementById("buscadorProducto"); // cuando se selecciona/deselecciona el buscador
clave1.addEventListener("input",filtrarProductos);


function filtrarProductos(){


// Primer nivel de filtro: por categoria
let categoriasSeleccionadas = false; // Da valor inicial false a la variable categoriasSeleccionadas

const checkboxTabla = document.getElementById("Tabla"); // Trae el contenido del checkbox Tabla

if(checkboxTabla.checked){
    productosFiltrados1 = productos.filter(producto => { // Si está activado por el usuario, filtra por la categoria Tabla y lo almacena en productosFiltrados1
    return checkboxTabla.checked ? producto.categoria === "Tabla" : true;
    });
} else{
    productosFiltrados1=[]; // Si no esta activado por el usuario, vacia el array
}

    if(productosFiltrados1.length>0){ // Si hay elementos filtrados, cambia el valor de la variable categoriasSeleccionada a true
        categoriasSeleccionadas = true;
    }


const checkboxVelas = document.getElementById("Vela"); // Trae el contenido del checkbox Vela

if (checkboxVelas.checked) { // Si está activado por el usuario, filtra por la categoria Vela y lo almacena en productosFiltrados2
    productosFiltrados2 = productos.filter(producto => {
        return checkboxVelas.checked ? producto.categoria === "Vela" : true;
    });
} else{
    productosFiltrados2=[]; // Si no esta activado por el usuario, vacia el array
}
    if(productosFiltrados2.length>0){ // Si hay elementos filtrados, cambia el valor de la variable categoriasSeleccionada a true
        categoriasSeleccionadas = true;
    }

if(categoriasSeleccionadas){ // Si hay categorias seleccionadas, concatena los arrays de las categorias selaccionadas. Tiene en cuenta que uno de ellos puede estar vacio
productosFiltrados = [...(productosFiltrados1 || []), ...(productosFiltrados2 || [])];
} else {
    productosFiltrados = productos; 
}


// const contenedor = document.getElementById("Productos"); // Limpia el contenedor
// contenedor.innerHTML = ""; // Limpia el contenedor
//mostrarProductos(productosFiltrados); // muestra los productos filtrados -- ESTO SE VA CUANDO IMPLEMENTE LOS OTROS NIVELES DE FILTRO

//    Segundo nivel de filtro: por subcategoria

let subcategoriasSeleccionadas2 = false;

let elemento = "Wave";

const checkboxWave = document.getElementById(elemento); // Trae el contenido del checkbox Wave
if(checkboxWave.checked){
    productosFiltradosWave = productosFiltrados.filter(producto => { // Si está activado por el usuario, filtra por la categoria Tabla y lo almacena en productosFiltrados1
    return checkboxWave.checked ? producto.subcategoria === elemento : true;
    });
} else{
    productosFiltradosWave= productosFiltrados; // Si el checkbox no esta activado por el usuario, no filtra
}
if(productosFiltradosWave.length>0){ // Si hay elementos filtrados, cambia el valor de la variable categoriasSeleccionada a true
    subcategoriasSeleccionadas2 = true;
}

    if (subcategoriasSeleccionadas2){
        productosFiltrados4 = productosFiltradosAc // CArga el array productosFiltrados2 con los datos de todas las subcategorias seleccionadas
    } else{ // No hay subcategorias seleccionadas
        productosFiltrados4 = productosFiltrados; // Carga el array productosFiltrados2 con los datos del primer nivel de filtros.
    }


    // let elemento = "Wave";

    // const checkboxWave = document.getElementById(elemento); // Trae el contenido del checkbox Wave
    // if(checkboxWave.checked){
    //     productosFiltradosWave = productosFiltrados.filter(producto => { // Si está activado por el usuario, filtra por la categoria Tabla y lo almacena en productosFiltrados1
    //     return checkboxWave.checked ? producto.subcategoria === elemento : true;
    //     });
    // } else{
    //     productosFiltradosWave= productosFiltrados; // Si el checkbox no esta activado por el usuario, no filtra
    // }
    // if(productosFiltradosWave.length>0){ // Si hay elementos filtrados, cambia el valor de la variable categoriasSeleccionada a true
    //     subcategoriasSeleccionadas2 = true;
    // }
    
    //     if (subcategoriasSeleccionadas2){
    //         productosFiltrados4 = productosFiltradosAc // CArga el array productosFiltrados2 con los datos de todas las subcategorias seleccionadas
    //     } else{ // No hay subcategorias seleccionadas
    //         productosFiltrados4 = productosFiltrados; // Carga el array productosFiltrados2 con los datos del primer nivel de filtros.
    //     }
    
    





console.log("click");
console.log(productosFiltrados4);
const contenedor = document.getElementById("Productos"); // Limpia el contenedor
contenedor.innerHTML = ""; // Limpia el contenedor
mostrarProductos(productosFiltrados4); 


}

// elementosFiltrarSubcategorias.forEach(elemento => {
//     const checkbox = document.getElementById(elemento.toLowerCase());
//     // console.log(elemento);

//     if (checkbox.checked) {
//         const productosFiltradosSubcategoria = productosFiltrados.filter(producto =>
//             producto.subcategoria.toLowerCase() === elemento.toLowerCase()
//         );

//         productosFiltradosAc = [...productosFiltradosAc, ...productosFiltradosSubcategoria];
//         subcategoriasSeleccionadas = true;
//     }
// });

//     if (subcategoriasSeleccionadas){
//         productosFiltrados2 = productosFiltradosAc // CArga el array productosFiltrados2 con los datos de todas las subcategorias seleccionadas
//     } else{ // No hay subcategorias seleccionadas
//         productosFiltrados2 = productosFiltrados; // Carga el array productosFiltrados2 con los datos del primer nivel de filtros.
//     }

// Tercer nivel de filtro: Por texto

//     if(clave1.value!=""){
//         productosFiltrados3 = productosFiltrados2.filter(producto => 
//         producto.articulo.toLowerCase().includes(clave1.value.toLowerCase())||producto.descripcion.toLowerCase().includes(clave1.value.toLowerCase())
//     );
//     } else {
//         productosFiltrados3 = productosFiltrados2;
//     }
//     const contenedor = document.getElementById("Productos");
//     contenedor.innerHTML = ""; // Limpiar el contenedor
//     mostrarProductos(productosFiltrados3); // Muestra los productos filtrados
// }


// AREA DE CARRITO
// Area de definicion de variables
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
    Toastify({
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
        const {articulo, precio} = producto; // Asigna las propiedades articulo y precio a las variables articulo y precio - Cumple con la consigna de utilizar desestructuración
        contenedor = document.createElement("div");        
        contenedor.innerHTML = ""; // Vacía el contenedor
        contenedor.innerHTML = `<h1> ${articulo}</h1>
                                <b> u$s ${precio}</b>
                                <button class="btn btn-primary" onclick="quitarDelCarrito('${producto.articulo}', ${producto.precio})">Quitar del Carrito</button><br>`; //Define el innerHTML del elemento con una plantilla de texto// Agrega cada elemento del array carrito al contenido de la variable contenedor             
        contenedor.className += "cardcarrito"; // Agrega la clase a la variable contenedor
        document.getElementById("carrito").appendChild(contenedor); // Agrega la variable contenedor al elemento del carrito
        });
        let contenedorb = document.getElementById("totalCarrito"); // Guarda el elemento con el Id="totalCarrito" en la variable contenedorb
        contenedorb.innerHTML = `<p>Total Carrito: u$s ${totalCarrito()}</p><br>` // Agrega el total del carrito
        let contenedorc = document.getElementById("vaciaCarrito"); // Agrega el boton de Checkout
        contenedorc.innerHTML = `<button class="btn btn-primary" onclick="vaciaCarrito()">Vaciar el carrito</button><br>`
       let contenedord = document.getElementById("checkOut"); // Agrega el boton de Checkout
        contenedord.innerHTML = `<button class="btn btn-primary" onclick="Checkout()">Checkout</button><br>`
    }

function vaciaCarrito(){
    carrito = [];
    guardarCarritoEnElLocalStorage();
    mostrarCarrito(carrito) // Muestra el carrito con el producto ya eliminado
    Toastify({
        text: `Vaciaste el carrito!`,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();    
}

function Checkout(){ // Abre la ventana de Chekout (no desarrollada, abre la homepage de Goya)
    // Abrir nuevo tab
    let win = window.open('https://goyawindsurfing.com/', '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
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
    Toastify({
        text: `Quitaste ${articulo} del carrito!`,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();
}













