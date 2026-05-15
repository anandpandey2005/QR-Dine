import { Request, Response } from "express";
import Cart from "../models/Cart.models.js";
import Product from "../models/Products.models.js";
/*
--> get cart
--> add item in a cart
--> add / update customization in an cart
--> update the quantity of a  product in a cart (inc / dec)
--> remove product from a cart
--> remove all the product from the cart
--> move to order
--> after successfull flow it moves into an order schemas
--> final run when place order clean the cart 
*/

export const get_cart_item = async (req: Request, res: Response) => {
  const userId = req?.user?._id || {};
  try {
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please login to add items to cart',
        statusCode: 401
      });
    }

    const cart = await Cart.findOne({ userId }).lean();

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty",
        data: [],
        totalItems: 0
      });
    }

    return res.status(200).json({
      success: true,
      message: "Records found",
      data: cart,
      totalItems: cart.items.length
    });

  } catch (error: unknown) {

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}

export const add_item_in_cart = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please login to add items to cart',
        statusCode: 401
      });
    }

    const { productId, quantity = 1, customizations = '' } = req?.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
        statusCode: 400
      });
    }

    if (quantity < 1 || !Number.isInteger(quantity)) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive integer',
        statusCode: 400
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        statusCode: 404
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {

      cart.items.push({
        productId,
        quantity,
        customizations,
        priceSnapshot: product.todayPrice
      });
    }

    const updatedCart = await cart.save();

    await updatedCart.populate('items.productId', 'name images todayPrice');

    return res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      statusCode: 200,
      data: {
        cartId: updatedCart._id,
        items: updatedCart.items,
        totalItems: updatedCart.items.length,
        totalAmount: updatedCart.totalAmount
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        statusCode: 500
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 500
    });
  }
}


export const add_update_customization_in_cart = async (req: Request, res: Response) => {
  const userId = req?.user?._id || {};
  const { productId, customizations } = req?.body || {};

  try {

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please login to update cart customizations',
        statusCode: 401
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product required',
        statusCode: 400
      });
    }

    if (customizations === undefined || customizations === null || !customizations) {
      return res.status(400).json({
        success: false,
        message: 'Customizations data is required',
        statusCode: 400
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
        statusCode: 404
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
        statusCode: 400
      });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (itemIndex < 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
        statusCode: 404
      });
    }

    cart.items[itemIndex].customizations = customizations;

    const updatedCart = await cart.save();

    await updatedCart.populate('items.productId', 'name images todayPrice');

    return res.status(200).json({
      success: true,
      message: 'Customizations updated successfully',
      statusCode: 200,
      data: {
        cartId: updatedCart._id,
        items: updatedCart.items,
        totalItems: updatedCart.items.length,
        totalAmount: updatedCart.totalAmount
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        statusCode: 500
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 500
    });
  }
}

export const update_quantity_of_product_in_cart = async (req: Request, res: Response) => {
  try {

  } catch (error: unknown) {

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}

export const remove_product_from_cart = async (req: Request, res: Response) => {
  try {

  } catch (error: unknown) {

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}

export const clear_cart = async (req: Request, res: Response) => {
  try {

  } catch (error: unknown) {

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}



