const socket = io();


socket.on('actualizarProductos', (products) => {
  const lista = document.getElementById('lista-productos');
  lista.innerHTML = '';
  products.forEach((product) => {
    const item = document.createElement('li');
    item.textContent = `Nombre:${product.nombre} - Precio $${product.precio} - Stock: ${product.stock}`;
    lista.appendChild(item);
  });
});


document.getElementById('form-agregar').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const stock = parseInt(document.getElementById('stock').value, 10);

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  socket.emit('agregarProducto', { nombre, precio, stock });
  e.target.reset();
});


document.getElementById('form-eliminar').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre-eliminar').value;
  if (!nombre) {
    alert('Por favor, ingresa el nombre del producto a eliminar.');
    return;
  }
  socket.emit('eliminarProducto', { nombre });
  e.target.reset();
});
