const socket = io();

const productsList = document.getElementById("products");

socket.on("init", (producs) => {
  products.forEach((product) => {
    const li = createProduct(product);
    productList.appendChild(li);
  });
});

socket.on("new-product", (product) => {
  const li = createProduct(product);
  pokemonList.appendChild(li);
});

function createProduct(product) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${product.nombre}</strong>: ${product.precio}
  `;
  li.className = "collection";

  return li;
}