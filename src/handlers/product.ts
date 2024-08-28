import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    res.json({ data: product });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findAll({
    order: [["id", "DESC"]],
  });
  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  const savedProduct = await product.save();
  res.status(201).json({ data: savedProduct });
};
// PUT para actualizar datos completos de una tabla
export const updateProduct = async (req :Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }
  
  //Actualizar
  await product.update(req.body);
  await product.save()

  res.json({ data: product });
};

// PACTH para modificar datos especifico de una tabla
export const updateProductPacth = async(req : Request, res : Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }
  
  //modifica
  product.available = !product.dataValues.available
  await product.save()

  res.json({ data: product });
}

export const deleteProduct = async (req :Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }
  
  //eliminar producto
  product.destroy()
  res.json({data : 'Producto Eliminado'})
  
}
