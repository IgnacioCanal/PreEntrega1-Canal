const socket = io();

socket.on("actualizarProductos", (products, totalPages) => {
  const lista = document.getElementById("lista-productos");
  lista.innerHTML = "";
  products.docs.forEach((product) => {
    const item = document.createElement("li");
    item.classList.add("collection-item", "col", "s12", "m6");
    item.innerHTML = `
      <p>
        <span class="yellow accent-2" 
              style="border-radius: 10%; padding: 10px 15px; margin-right: 10px; font-weight: bold;">
          ${product.nombre}
        </span>
        Precio: $${product.precio} | Stock: ${product.stock}
      </p>
    `;
    lista.appendChild(item);
  });

  if (totalPages) {
    currentPage = totalPages;
    window.location.href = `/realtimeproducts?page=${currentPage}`;
  }
});

document.getElementById("form-agregar").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value, 10);

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  socket.emit("agregarProducto", { nombre, precio, stock });
  e.target.reset();
});

document.getElementById("form-eliminar").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-eliminar").value;
  const currentPage = new URLSearchParams(window.location.search).get('page') || 1;
  if (!nombre) {
    alert("Por favor, ingresa el nombre del producto a eliminar.");
    return;
  }
  socket.emit("eliminarProducto", { nombre, currentPage });
  e.target.reset();
});
