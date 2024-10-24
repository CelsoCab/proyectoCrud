console.log("Hola")
//creamos el evento
const btnAgregar = document.getElementById("agregarProducto");


//crewamos la funcion
crear = () => {
    const inputProducto = document.getElementById("producto");
    const inputDescripcion = document.getElementById("descripcion");
    const inputPrecio = document.getElementById("precio");

    const nuevoProducto = {
    nombre: inputProducto.value,
    descripcion: inputDescripcion.value,
    precio: inputPrecio.value,
}

btnAgregar.addEventListener("click", () => {
    // Optional error checking (if desired)
    if (nuevoProducto.nombre && nuevoProducto.descripcion && nuevoProducto.precio) {
      localStorage.setItem("producto", JSON.stringify(nuevoProducto));
      alert("Producto agregado al almacenamiento local");
    } else {
      alert("Llena todos los campos para agregar el producto");
    }
  });

}




