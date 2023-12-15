// AREA DE DEFINCION DE PRODUCTOS
//Tablas
let carrito = [];
const localStorage = window.localStorage;

// const productos = [
//     { articulo: "Wave Custom 4 Pro",  categoria: "Tabla", subcategoria: "Wave", descripcion: "Surfwave Quad", foto:"images/tablas/2022_Goya_Windsurfing_Custom_4_Pro_rev2.jpg", precio:2300},
//     { articulo: "Wave Custom 3 Pro",  categoria: "Tabla", subcategoria: "Wave", descripcion: "Surfwave Thruster", foto:"images/tablas/2022_Goya_Windsurfing_Custom_3_Pro_rev2.jpg", precio:2200},
//     { articulo: "Wave Nitro 3 Pro",  categoria: "Tabla", subcategoria: "Wave", descripcion: "Compact Thruster", foto:"images/tablas/2022_Goya_Windsurfing_Nitro_3_Pro_rev2.jpg", precio:2350},
//     { articulo: "Freewave One 3 Carbon",  categoria: "Tabla", subcategoria: "Freewave", descripcion: "Freewave Thruster", foto:"images/tablas/2022_Goya_Windsurfing_One_3_Carbon_rev2.jpg", precio:2450},
//     { articulo: "Freestyle Air Pro",  categoria: "Tabla", subcategoria: "Freestyle", descripcion: "Freestyle Single", foto:"images/tablas/2022_Goya_Windsurfing_Air_Pro_rev2.jpg", precio:2500},
//     { articulo: "Foil Airbolt carbon",  categoria: "Tabla", subcategoria: "Foil", descripcion: "Wind/Wing Foilboard", foto:"images/tablas/2022_Goya_Windsurfing_Airbolt_Carbon.jpg", precio:2700},
//     { articulo: "Foil Proton Pro",  categoria: "Tabla", subcategoria: "Race", descripcion: "Race Single", foto:"images/tablas/2021_Boards_proton_pro4_rendering.jpg", precio:2600},
//     { articulo: "Foil Bolt 4 Carbon",  categoria: "Tabla", subcategoria: "Foil", descripcion: "Freerace", foto:"images/tablas/bolt_carbon.jpg", precio:2750},
//     { articulo: "Freestyle Race Proton Pro",  categoria: "Tabla", subcategoria: "Freestyle", descripcion: "Race Single", foto:"images/tablas/2021_Boards_proton_pro4_rendering (1).jpg", precio:2600},
//     { articulo: "Freerace Bolt 4 Carbon",  categoria: "Tabla", subcategoria: "Freerace", descripcion: "Freerace", foto:"images/tablas/bolt_carbon (1).jpg", precio:2750},
//     { articulo: "Freeride Volar Carbon",  categoria: "Tabla", subcategoria: "Freeride", descripcion: "Freeride Single", foto:"images/tablas/2022_Goya_Windsurfing_Volar_Carbon.jpg", precio:2450},
//     { articulo: "Freeride Volar",  categoria: "Tabla", subcategoria: "Freeride", descripcion: "Freestyle Single", foto:"images/tablas/2022_Goya_Windsurfing_Volar.jpg", precio:2450},
//     { articulo: "Youth Custom 4 Pro",  categoria: "Tabla", subcategoria: "Youth", descripcion: "Surfwave Quad", foto:"images/tablas/2022_Goya_Windsurfing_Custom_4_Pro_rev2 (1).jpg", precio:2300},
//     { articulo: "Trainer Surf",  categoria: "Tabla", subcategoria: "Trainer", descripcion: "Trainer Single", foto:"images/tablas/2022_Goya_Windsurfing_Surf_220_rev3.jpg", precio:2100},
// // Velas
//     { articulo: "Wave Banzai Pro",  categoria: "Vela", subcategoria: "Wave", descripcion: "Powerwave 4 Batten", foto:"images/velas/2022_Goya_Windsurfing_Banzai_Pro_ROY.jpg", precio:900},
//     { articulo: "Wave Banzai X Pro",  categoria: "Vela", subcategoria: "Wave", descripcion: "Powerwave 4 Batten", foto:"images/velas/2022_Goya_Windsurfing_Banzai_X_Pro_BBY.jpg", precio:950},
//     { articulo: "Wave Fringe Pro",  categoria: "Vela", subcategoria: "Wave", descripcion: "Surfwave 3 Batten", foto:"images/velas/2022_Goya_Windsurfing_Fringe_Pro_ROY.jpg", precio:850},
//     { articulo: "Wave Fringe X Pro",  categoria: "Vela", subcategoria: "Wave", descripcion: "Surfwave 3 Batten", foto:"images/velas/2022_Goya_Windsurfing_Banzai_Pro_ROY.jpg", precio:900},
//     { articulo: "Wave Eclipse Pro",  categoria: "Vela", subcategoria: "Wave", descripcion: "Variowave 5 Batten", foto:"images/velas/2022_Goya_Windsurfing_Eclipse_Pro_YYW.jpg", precio:1000},
//     { articulo: "Wave Guru X",  categoria: "Vela", subcategoria: "Wave", descripcion: "Controlwave 4 Batten", foto:"images/velas/2022_Goya_Windsurfing_Guru_X_BBY.jpg", precio:1050},
//     { articulo: "Feestyle Cypher Pro",  categoria: "Vela", subcategoria: "Freestyle", descripcion: "Freestyle & Foil", foto:"images/velas/2022_Goya_Windsurfing_Cypher_Pro_YYP.jpg", precio: 1100},
//     { articulo: "Foil Cypher Pro",  categoria: "Vela", subcategoria: "Foil", descripcion: "Freestyle & Foil", foto:"images/velas/2022_Goya_Windsurfing_Cypher_Pro_YYP (1) foil.jpg", precio: 1100},
//     { articulo: "Foil Fringe Pro",  categoria: "Vela", subcategoria: "Foil", descripcion: "Surfwave 3 batten", foto:"images/velas/2022_Goya_Windsurfing_Fringe_X_Pro_BBY.jpg", precio: 850},
//     { articulo: "Freerace Mark 2",  categoria: "Vela", subcategoria: "Freerace", descripcion: "Freerace 2 Cam 6 Batten", foto:"images/velas/2022_Goya_Windsurfing_Mark_2_FPY.jpg", precio: 1100},
//     { articulo: "Freerace Mark B",  categoria: "Vela", subcategoria: "Freerace", descripcion: "Freerace 6 Batten", foto:"images/velas/2022_Goya_Windsurfing_Mark_B_YYP.jpg", precio: 1050},
//     { articulo: "Freerace Mark X",  categoria: "Vela", subcategoria: "Freerace", descripcion: "Freerace 6 Batten", foto:"images/velas/2022_Goya_Windsurfing_Mark_X_BBY.jpg", precio: 1150},
//     { articulo: "Freerace Mark",  categoria: "Vela", subcategoria: "Freerace", descripcion: "Freerace 6 Batten", foto:"images/velas/2022_Goya_Windsurfing_Mark_ROY.jpg", precio: 1000},
//     { articulo: "Freeride Nexus B",  categoria: "Vela", subcategoria: "Freeride", descripcion: "Freeride 5 Batten", foto:"images/velas/2022_Goya_Windsurfing_Nexus_B_YYP.jpg", precio: 1200},
//     { articulo: "Freeride Nexus",  categoria: "Vela", subcategoria: "Freeride", descripcion: "Freeride 5 Batten", foto:"images/velas/2022_Goya_Windsurfing_Nexus_BBY.jpg", precio: 1200},
//     { articulo: "Youth Scion X",  categoria: "Vela", subcategoria: "Youth Scion X", descripcion: "Youth 3 Batten", foto:"images/velas/2022_Goya_Windsurfing_Scion_X_ROY.jpg", precio: 1200},
//     { articulo: "Trainer Surf",  categoria: "Vela", subcategoria: "Trainer Surf", descripcion: "Trainer 1 to 3 Batten", foto:"images/velas/2022_Goya_Windsurfing_Surf_2_OOY.jpg", precio: 1200},
// ];

function ObtenerInformacionPersonaje(){
    return new Promise ((resolve,reject) => {
        fetch(JSON/productos.json)
        .then(response=>{
            debugger
            if(!response.ok){ 
                throw new Error("Error al cargar la API, comunicate con el administrador");                
            }
            return response.json();
        })
        .then(data=>resolve(data))
        .catch(error=>reject(error));
    })
}

async function main(){
    try{
        const informacionPersonaje = await ObtenerInformacionPersonaje()
        debugger
        console.log(informacionPersonaje) //crearCards(InformacionPersonaje) 
    }catch(error){
        console.error("Error en la app",error)
    }
}

main()

const productos = informacionPersonaje();

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

// Llama a la funcion filtrar productos cuando el usuario escribe en el cuadro de dialogo de buscar producto o selecciona un checkbox
let clave1 = document.getElementById("buscadorProducto"); // buscador
clave1.addEventListener("input",filtrarProductos);

let elementosFiltrar = ["tablas","velas","wave","freewave","freestyle","foil","race","freerace","freeride","youth","trainer"];

elementosFiltrar.forEach(elemento => { // Checkbox
    const elementoDOM = document.getElementById(elemento);
    elementoDOM.addEventListener("input", () => filtrarProductos());
});

function filtrarProductos(){

    // Area de definicion de variables para filtrarProductos
    let productosFiltrados = {};
    let productosFiltrados2 = {};
    let subcategoriasSeleccionadas = false;
    let productosFiltradosb = [];
    let productosFiltradosAc = [];  
    let productosFiltrados3 = [];  

// Los filtros de productos funcionan en tres niveles en cascada. Primero se filtra por categorias. El resultado se filtra por subcategorias, y este segundo resultado se filtra por el texto ingresado 


// Primer nivel de filtro: por categoria
tablas.checked? velas.checked? // Checkboxes tablas y velas marcados
productosFiltrados = productos.filter(producto => 
    producto.categoria==="Tabla"||producto.categoria==="Vela") : 
    productosFiltrados = productos.filter(producto => // Solo checkbox tablas marcado
    producto.categoria==="Tabla") : 
velas.checked? // Solo checkbox velas marcado
productosFiltrados = productos.filter(producto => 
    producto.categoria==="Vela") : 
    productosFiltrados = productos;   // Ni Tablas ni velas marcados

//    Segundo nivel de filtro: por subcategoria

elementosFiltrar.forEach(elemento => {
    const checkbox = document.getElementById(elemento.toLowerCase());
    
    if (checkbox.checked) {
        const productosFiltradosSubcategoria = productosFiltrados.filter(producto =>
            producto.subcategoria.toLowerCase() === elemento.toLowerCase()
        );

        productosFiltradosAc = [...productosFiltradosAc, ...productosFiltradosSubcategoria];
        subcategoriasSeleccionadas = true;
    }
});

    if (subcategoriasSeleccionadas){
        productosFiltrados2 = productosFiltradosAc // CArga el array productosFiltrados2 con los datos de todas las subcategorias seleccionadas
    } else{ // No hay subcategorias seleccionadas
        productosFiltrados2 = productosFiltrados; // Carga el array productosFiltrados2 con los datos del primer nivel de filtros.
    }

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
    mostrarProductos(productosFiltrados3); // Muestra los productos filtrados
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
}

function mostrarCarrito(carrito) { // Muestra los productos en la seccion carrito
    let contenedor = document.getElementById("carrito"); // Guarda el elemento con el Id="carrito" en la variable contenedor
    contenedor.innerHTML = `<p id="carrito"class="textoCarrito">Carrito</p>`; // Vacía el carrito y vuelve a poner el título
    carrito.map(function(producto){ // Recorre el array de carrito con un map. Cumple con la consigna de utilizar MAP.
        contenedor = document.createElement("div");        
        contenedor.innerHTML = ""; // Vacía el contenedor
        contenedor.innerHTML = `<h1> ${producto.articulo}</h1>
                                <b> u$s ${producto.precio}</b>
                                <button class="btn btn-primary" onclick="quitarDelCarrito('${producto.articulo}', ${producto.precio})">Quitar del Carrito</button><br>`; //Define el innerHTML del elemento con una plantilla de texto// Agrega cada elemento del array carrito al contenido de la variable contenedor             
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

function vaciaCarrito(){
    carrito = [];
    guardarCarritoEnElLocalStorage();
    mostrarCarrito(carrito) // Muestra el carrito con el producto ya eliminado

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
}













