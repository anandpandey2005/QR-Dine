import { Request, Response } from "express";
import Cart from "../models/Cart.models.js";
import { success } from "zod";
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
      throw new Error('login again , something missing')
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

export const add_update_customization_in_cart = async (req: Request, res: Response) => {
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



