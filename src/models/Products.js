import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false, default: 'Sin descripción' },
    precio: { type: Number, required: true },
    categoria: { type: String, required: false, default: 'Sin categoría' },
    stock: { type: Number, default: true, default: 0 },
    codigo: { type: String, required: false, unique: false },
    thumbnails: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;