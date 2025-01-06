# Preentrega1-CANAL

## Descripción

Preentrega1-CANAL es una aplicación para la gestión de productos y carritos de compras. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y carritos. Esta aplicación está construida con Node.js y Express.

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
