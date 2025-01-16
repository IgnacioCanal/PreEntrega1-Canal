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
  const precio = document.getElementById('precio').value;
  const stock = document.getElementById('stock').value;
  socket.emit('agregarProducto', { nombre, precio, stock, productId: uuid() });
  e.target.reset();
});


document.getElementById('form-eliminar').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre-eliminar').value;
  socket.emit('eliminarProducto', { nombre });
  e.target.reset();
});
