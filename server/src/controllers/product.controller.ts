import { Request, Response } from 'express';
import Product from '../models/Products.models.js';
import { normalizeName } from '../utils/normalization.utils.js';
import Category from '../models/Category.models.js';

export const addProduct = async (req: Request, res: Response) => {
  let {
    name,
    ingredients = [],
    regularPrice,
    todayPrice,
    category,
    stock,
    underOffer,
    isVegetarian,
    note,
  } = req?.body || {};
  if (!name || regularPrice === undefined || todayPrice === undefined || !category) {
    return res.status(400).json({ success: false, message: 'Unexpected empty value' });
  }

  if (typeof regularPrice !== 'number' || typeof todayPrice !== 'number') {
    return res
      .status(400)
      .json({ success: false, message: 'regularPrice and todayPrice must be numbers' });
  }

  name = normalizeName(name);
  category = normalizeName(category);
  note = normalizeName(note);

  try {
    const category_ = await Category.findOneAndUpdate(
      { name: category },
      { name: category },
      { upsert: true, new: true },
    );
    const newProduct = new Product({
      name,
      ingredients,
      regularPrice,
      todayPrice,
      category: category_._id,
      stock,
      underOffer,
      isVegetarian,
      note,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: savedProduct,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || 'something got wrong while saving file in database',
      });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const data = await Product.find({ isActive: true });
    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products found.',
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: `${data.length} records fetched successfully.`,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { _id = [] } = req.body || {};

  if (!Array.isArray(_id) || _id.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'An array of Product IDs is required.',
    });
  }

  try {
    const result = await Product.deleteMany({ _id: { $in: _id } });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found to delete. They may have already been removed.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} product(s) deleted successfully.`,
      data: result,
    });
  } catch (error) {
    console.error('Error deleting products:', error);

    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

export const manageActiveStatus = async (req: Request, res: Response) => {
  const { _ids = [], isActive = true } = req?.body || {};

  if (!Array.isArray(_ids) || _ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'An array of Product IDs is required.',
    });
  }
  try {
    const filter = { _id: { $in: _ids } };
    const set = { isActive: { $set: isActive } };

    const data = await Product.updateMany(filter, set);
    if (data.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No matching products found to update.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully updated ${data.modifiedCount} product(s).`,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: any = {};

  try {
    if (req.body.name !== undefined) {
      updateData.name = normalizeName(req.body.name);
    }
    if (req.body.category !== undefined) {
      const categoryName = normalizeName(req.body.category);
      const category_ = await Category.findOneAndUpdate(
        { name: categoryName },
        { name: categoryName },
        { upsert: true, new: true },
      );
      updateData.category = category_._id;
    }
    if (req.body.note !== undefined) {
      updateData.note = normalizeName(req.body.note);
    }

    const allowedFields = [
      'ingredients',
      'regularPrice',
      'todayPrice',
      'rating',
      'stock',
      'underOffer',
      'isActive',
      'isVegetarian',
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No valid fields provided for update' });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found or inactive' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || 'Something went wrong while updating the product in database',
      });
  }
};
