import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import Cart from "../models/Cart.models.js";
import Product from "../models/Products.models.js";

export const addToCart = async (req: AuthRequest, res: Response) => {
    const { productId, quantity = 1, customizations = "" } = req.body;
    const userId = req.user?.userId;

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            return res.status(404).json({ success: false, message: "Product not found or inactive" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find((item: any) => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.customizations = customizations || existingItem.customizations;
        } else {
            cart.items.push({
                productId,
                quantity,
                customizations,
                priceSnapshot: product.todayPrice,
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            data: cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message || "Internal Server Error"
        });
    }
};

export const getCart = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                data: { items: [], totalAmount: 0 },
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message || "Internal Server Error"
        });
    }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
    const { productId, quantity, customizations } = req.body;
    const userId = req.user?.userId;

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const item = cart.items.find((item: any) => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (quantity !== undefined) item.quantity = quantity;
        if (customizations !== undefined) item.customizations = customizations;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message || "Internal Server Error"
        });
    }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
    const { productId } = req.body;
    const userId = req.user?.userId;

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            data: cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message || "Internal Server Error"
        });
    }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { items: [], totalAmount: 0 },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message || "Internal Server Error"
        });
    }
};