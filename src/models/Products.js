import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripción: { type: String, required: true },
    precio: { type: Number, required: true },
    categoría: { type: String, required: true },
    stock: { type: Number, default: true },
    código: { type: String, required: true, unique: true },
    thumbnails: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;