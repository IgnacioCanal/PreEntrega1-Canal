# Preentrega2-CANAL

## Descripción

Preentrega2-CANAL es una aplicación para la gestión de productos y carritos de compras. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y carritos. Además, ofrece funcionalidades avanzadas como la visualización dinámica de productos con Handlebars (HBS), y la comunicación en tiempo real entre los usuarios mediante WebSockets y Socket.io. Con estas tecnologías, la aplicación se actualiza automáticamente en tiempo real, mejorando la experiencia del usuario sin necesidad de recargar la página. Todo esto está construido con Node.js, Express, WebSockets, y Socket.io, proporcionando una experiencia más dinámica y fluida en el manejo de productos y carritos de compra.


## Características

- **Gestión de Productos**:
  - Crear nuevos productos.
  - Listar todos los productos.
  - Obtener detalles de un producto específico.
  - Actualizar productos existentes.
  - Eliminar productos.

- **Gestión de Carritos**:
  - Crear nuevos carritos.
  - Listar todos los carritos.
  - Obtener detalles de un carrito específico.
  - Agregar productos a un carrito.
  - Eliminar productos de un carrito.


### Nuevas Funcionalidades

**Visualización Dinámica de Productos con Handlebars (HBS)**  
- La aplicación utiliza Handlebars (HBS) para renderizar las vistas de productos de manera dinámica. Los productos se muestran de manera eficiente en el navegador, facilitando una experiencia interactiva.

**WebSockets y Socket.io para Comunicación en Tiempo Real**  
- Se implementó WebSocket y Socket.io para habilitar la actualización en tiempo real de la lista de productos, carritos y otros cambios, lo que permite a los usuarios recibir información sin tener que recargar la página.

**Vistas Dinámicas con Handlebars**  
- Las vistas de los productos y carritos ahora están renderizadas de manera eficiente con Handlebars (HBS), mejorando el rendimiento y la experiencia del usuario al interactuar con la tienda online.

**Interacción en Tiempo Real**  
- Gracias a Socket.io, los carritos y los productos se sincronizan en tiempo real. Cualquier cambio realizado por un usuario se refleja de inmediato en otros usuarios conectados.


## Endpoints

### Productos

- **GET** `/api/products` - Lista todos los productos.
- **GET** `/api/products/:productId` - Obtiene los detalles de un producto específico.
- **POST** `/api/products` - Crea un nuevo producto.
- **PUT** `/api/products/:productId` - Actualiza un producto existente.
- **DELETE** `/api/products/:productId` - Elimina un producto.

### Carritos

- **GET** `/api/carts` - Lista todos los carritos.
- **GET** `/api/carts/:cartId` - Obtiene los detalles de un carrito específico.
- **POST** `/api/carts` - Crea un nuevo carrito.
- **POST** `/api/carts/:cartId/products/:productId` - Agrega un producto al carrito.
- **DELETE** `/api/carts/:cartId/products/:productId` - Elimina un producto del carrito.

## Uso

Para probar los endpoints, puedes usar la herramienta Postman.

## Contacto

Para cualquier consulta o sugerencia, puedes contactarme a través de [mi perfil de GitHub](https://github.com/IgnacioCanal).

---

¡Gracias por usar Preentrega1-CANAL! 🎉
