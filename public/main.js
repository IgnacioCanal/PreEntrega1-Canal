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


async function addToCart(productId) {
  try {
    let cartId = getCartFromLocalStorage();
    if (!cart) {
      cart = createNewCart();
    }

    const response = await fetch(`/carts/${cartId}/products/${productId}`, {
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Producto agregado al carrito:', data);
      cart.products.push({ productId, quantity: 1 });
      saveCartToLocalStorage(cart);
      alert('Producto agregado al carrito');
    } else {
      const error = await response.json();
      alert('Error al agregar el producto al carrito: ' + error.message);
    }
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    alert('Error al agregar el producto al carrito');
  }
}


function getCartFromLocalStorage() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : null;
}

function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function createNewCart() {
  const newCart = {
    cartId: generateCartId(),
    products: []
  };
  saveCartToLocalStorage(newCart);
  return newCart;
}


function generateCartId() {
  return 'cart-' + Date.now();
}

