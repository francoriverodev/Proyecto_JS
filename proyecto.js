// Array de productos (objetos)
const productos = [
  { id: 1, nombre: "Cable eléctrico 10m", precio: 1200 },
  { id: 2, nombre: "Bombilla LED 15W", precio: 800 },
  { id: 3, nombre: "Interruptor simple", precio: 450 },
  { id: 4, nombre: "Toma corriente doble", precio: 600 },
  { id: 5, nombre: "Reflector LED 50W", precio: 3500 }
];

// Carrito
let carrito = [];

// Función para mostrar menú de productos
function mostrarMenu(nombre) {
  let menu = `Hola ${nombre}, selecciona un producto:\n`;
  productos.forEach(p => {
    menu += `${p.id}. ${p.nombre} - $${p.precio}\n`;
  });
  menu += "0. Finalizar compra";
  return menu;
}

// Función principal
function iniciarCompra() {
  // Pedir nombre del cliente
  const nombre = prompt("¡Bienvenido a la Tienda de Electricidad! 🛒\nPor favor ingresa tu nombre:");

  alert(`Encantado de atenderte, ${nombre}. ¡Comencemos tu compra!`);

  let opcion;
  do {
    opcion = parseInt(prompt(mostrarMenu(nombre)));
    if (opcion === 0) break;

    const producto = productos.find(p => p.id === opcion);
    if (producto) {
      carrito.push(producto);
      alert(`${producto.nombre} agregado al carrito, ${nombre}`);
    } else {
      alert("Opción inválida. Intenta de nuevo.");
    }
  } while (opcion !== 0);

  finalizarCompra(nombre);
}

// Función para mostrar el resumen de compra
function finalizarCompra(nombre) {
  if (carrito.length === 0) {
    alert(`No compraste nada, ${nombre}. ¡Te esperamos pronto!`);
    return;
  }

  let resumen = `Gracias por tu compra, ${nombre}.\n\nResumen de tu pedido:\n`;
  let total = 0;

  carrito.forEach(p => {
    resumen += `${p.nombre} - $${p.precio}\n`;
    total += p.precio;
  });

  resumen += `\nTOTAL: $${total}`;
  alert(resumen);
}

// Inicia el programa
iniciarCompra();



