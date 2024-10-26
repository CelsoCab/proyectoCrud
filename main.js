// Obtenemos el botón y el formulario
const formulario = document.getElementById("formulario");
const listaProductos = document.getElementById("listaProductos");
const btnAgregar = document.getElementById("agregarProducto");
const btnActualizar = document.getElementById("actualizarProducto");
const btnCancelar = document.getElementById("cancelarEdicion");

let editIndex = -1; // Variable para almacenar el índice del producto a editar

// Función para agregar producto
function agregarProducto(event) {
  event.preventDefault(); // Prevenimos que el formulario se envíe y la página se recargue

  const inputProducto = document.getElementById("producto");
  const inputDescripcion = document.getElementById("descripcion");
  const inputPrecio = document.getElementById("precio");

  const nuevoProducto = {
    nombre: inputProducto.value,
    descripcion: inputDescripcion.value,
    precio: inputPrecio.value,
  };

  // Guardamos el producto en localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productos));

  // Limpiamos los campos del formulario
  formulario.reset();

  // Mostramos los productos actualizados
  mostrarProductos();
}

// Función para mostrar los productos en la lista
function mostrarProductos() {
  listaProductos.innerHTML = ""; // Limpiamos la lista antes de agregar nuevos elementos
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `<strong>${producto.nombre}</strong> - ${producto.descripcion} - $${producto.precio}
                        <button class="btn btn-warning btn-sm float-end ms-2" onclick="editarProducto(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm float-end" onclick="eliminarProducto(${index})">Eliminar</button>`;
    listaProductos.appendChild(li);
  });
}

// Función para editar un producto
function editarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productos[index];

  // Llenamos el formulario con la información del producto
  document.getElementById("producto").value = producto.nombre;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("editIndex").value = index;

  // Mostrar botones de edición y ocultar el de agregar
  btnAgregar.classList.add("d-none");
  btnActualizar.classList.remove("d-none");
  btnCancelar.classList.remove("d-none");
}

// Función para actualizar un producto
function actualizarProducto() {
  const index = document.getElementById("editIndex").value;
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos[index] = {
    nombre: document.getElementById("producto").value,
    descripcion: document.getElementById("descripcion").value,
    precio: document.getElementById("precio").value,
  };

  localStorage.setItem("productos", JSON.stringify(productos));

  // Limpiamos el formulario
  formulario.reset();

  // Restablecemos los botones
  btnAgregar.classList.remove("d-none");
  btnActualizar.classList.add("d-none");
  btnCancelar.classList.add("d-none");

  mostrarProductos(); // Mostramos los productos actualizados
}

// Función para cancelar la edición
function cancelarEdicion() {
  formulario.reset();
  btnAgregar.classList.remove("d-none");
  btnActualizar.classList.add("d-none");
  btnCancelar.classList.add("d-none");
}

// Función para eliminar un producto
function eliminarProducto(index) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.splice(index, 1); // Eliminamos el producto seleccionado
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos(); // Actualizamos la lista
}

// Escuchamos el evento de submit del formulario
formulario.addEventListener("submit", agregarProducto);
btnActualizar.addEventListener("click", actualizarProducto);
btnCancelar.addEventListener("click", cancelarEdicion);

// Mostramos los productos cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(); // Asegurarnos de cargar los productos al cargar la página
});
