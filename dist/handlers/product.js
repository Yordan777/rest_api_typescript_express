"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductPacth = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProductById = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const getProduct = async (req, res) => {
    const product = await Product_model_1.default.findAll({
        order: [["id", "DESC"]],
    });
    res.json({ data: product });
};
exports.getProduct = getProduct;
const createProduct = async (req, res) => {
    const product = await Product_model_1.default.create(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ data: savedProduct });
};
exports.createProduct = createProduct;
// PUT para actualizar datos completos de una tabla
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }
    //Actualizar
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
// PACTH para modificar datos especifico de una tabla
const updateProductPacth = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }
    //modifica
    product.available = !product.dataValues.available;
    await product.save();
    res.json({ data: product });
};
exports.updateProductPacth = updateProductPacth;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }
    //eliminar producto
    product.destroy();
    res.json({ data: 'Producto Eliminado' });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map