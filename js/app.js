// Variables
const carrito = document.querySelector( '#carrito' );
const contenedorCarrito = document.querySelector( '#lista-carrito tbody' );
const vaciarCarritoBtn = document.querySelector( '#vaciar-carrito' );
const listaCursos = document.querySelector( '#lista-cursos' );
let articulosCarrito = [];
const cards = document.querySelector( '.info-card' );

cargarEventListeners();
function cargarEventListeners(){

    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener( 'click', agregarCurso );

    // Elimina cursos del carrito
    carrito.addEventListener( 'click', eliminarCurso );

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener( 'click', () => {
        articulosCarrito = [];

        limpiarHTML(); // Eliminamos todo el HTML
        checarCarrito();
    } );

    const numeroCursos = document.createElement( 'input' );
    numeroCursos.type = 'number';
    numeroCursos.min = 1;
    numeroCursos.value = 1;
    numeroCursos.classList.add( 'u-full-width', 'button-primary', 'button', 'cantidad-curso' );
    cards.insertBefore( numeroCursos, cards.children[ 4 ] );
}

// Funciones
function agregarCurso( e ){

    e.preventDefault();

    if ( e.target.classList.contains( 'agregar-carrito' ) ){

        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso( cursoSeleccionado );
    }
}

// Elimina un curso del carrito
function eliminarCurso( e ) {

    if ( e.target.classList.contains( 'borrar-curso' ) ) {
        const cursoId = e.target.getAttribute( 'data-id' );

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )
        
        carritoHTML(); // itera sobre el carrito y muestra su HTML

        checarCarrito();

    }
}

// lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso( curso ) {

    // crear un objeto con contenido del curso del curso actual
    const infoCurso = {
        imagen: curso.querySelector( 'img' ).src,
        titulo: curso.querySelector( 'h4' ).textContent,
        precio: curso.querySelector( '.precio span' ).textContent,
        id: curso.querySelector( 'a' ).getAttribute( 'data-id' ),
        cantidad: Number.parseInt( curso.querySelector( '.cantidad-curso' ).value ),
        total: 0,
    }

    let precioAux = infoCurso.precio;
    infoCurso.precio = Number.parseInt( precioAux.slice( precioAux.indexOf( '$' ) + 1 ) );

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if ( existe ){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ){
                curso.cantidad = infoCurso.cantidad;
                curso.total = infoCurso.cantidad * infoCurso.precio;
                return curso; // retorna el objeto actualizado
            }
            else {
                return curso; // retorna los objetos que no son duplicados
            }

        } );

        articulosCarrito = [ ...cursos ];
    }

    else{
        // Agregamos el curso al carrito
        // Agrega elementos al arreglo de carrito
        // articulosCarrito = [ ...articulosCarrito, infoCurso ];
        articulosCarrito.push( infoCurso );
    }

    checarCarrito();
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        const { imagen, titulo, precio, cantidad, id, total } = curso;
        const row = document.createElement( 'tr' );

        row.innerHTML = `
            <td><img src="${ imagen }" width="100"></td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>
            <td>${ precio * cantidad }</td>
            <td><a href="#" class="borrar-curso" data-id="${ id }"> X </a></td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild( row );

    } );
}

// Elimina los cursos del tbody
function limpiarHTML() {

    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while ( contenedorCarrito.firstChild ){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}

function checarCarrito() {

    if ( articulosCarrito.length !== 0) {
        vaciarCarritoBtn.innerText = 'Vaciar Carrito';
    }

    else{
        vaciarCarritoBtn.innerText = 'Carrito Vacio';
    }
    
}