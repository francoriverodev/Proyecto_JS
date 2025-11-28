// Constructor de productos
function Producto(id, nombre, precio, stock, imagen) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
  this.imagen = imagen;
}

// LISTA DE PRODUCTOS
let productos = [

    new Producto(1, "Modulo tomacorriente", 1500, "img/tomacorriente.jpg"),
    new Producto(2, "Modulo Interruptor", 1200, "img/interruptor.jpg"),
    new Producto(3, "Cable tipo taller 2.5x3", 3000, "img/cable.jpg"),
    new Producto(4, "Lámpara LED 12W", 1800, "img/lampara.jpg"),
    new Producto(5, "Disyuntor 40A", 8500, "img/disyuntor.jpg"),
    new Producto(6, "Cable 2.5mm x metro", 1200, "img/cable25.jpg")
    new Producto(7, "Termica bipolar 20A", 9500, "img/termica.jpg"),
];

// CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// MOSTRAR PRODUCTOS EN LA PÁGINA
function mostrarProductos() {
  const cont = document.getElementById("lista-productos");
  cont.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;

    cont.appendChild(div);
  });
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {
  let producto = productos.find(p => p.id === id);

  if (producto.stock <= 0) {
    alert("Sin stock");
    return;
  }

  carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
  producto.stock--;

  guardarCarrito();
  mostrarProductos();
  mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito() {
  const cont = document.getElementById("carrito");
  cont.innerHTML = "";

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <p>${item.nombre}</p>
      <p>$${item.precio}</p>
      <button onclick="eliminar(${index})">Eliminar</button>
    `;

    cont.appendChild(div);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  document.getElementById("total").innerText = `Total: $${total}`;
}

// ELIMINAR DEL CARRITO
function eliminar(index) {
  const item = carrito[index];
  const prod = productos.find(p => p.id === item.id);

  prod.stock++;
  carrito.splice(index, 1);

  guardarCarrito();
  mostrarCarrito();
  mostrarProductos();
}

// INICIALIZAR
mostrarProductos();
mostrarCarrito();
