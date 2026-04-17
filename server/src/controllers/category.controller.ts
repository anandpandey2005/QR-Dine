import { Request, Response } from "express";
import Category from "../models/Category.models.js";
import { normalizeName } from "../utils/normalization.utils.js";
import { success } from "zod";

// in future i will take image url from teh cloudinary multer storage
export const addCategory = async (req: Request, res: Response) => {
    let { name, image } = req?.body || {};
    if (!name) {
        return res.status(400).json({ success: false, message: "unExpected empty string" });
    }
    name = normalizeName(name);

    try {
        const isExist = await Category.find({ name });

        if (isExist.length > 0) {
            return res.status(409).json({ success: false, message: "Category already exists" });
        }

        const acknowledge = await Category.create({
            name,
            image,
        });
        return res.status(201).json({ success: true, message: "Category inserted", data: acknowledge });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

export const getCategory = async (req: Request, res: Response) => {
    try {
        const data = await Category.find({ isActive: true });
        if (data.length === 0) {
            return res.status(200).json({ success: true, message: "No data found", data: [] })
        }
        return res.status(200).json({ success: true, message: `${data.length} records fetched`, data })
    } catch (error: any) {
        return res.status(500).json({
            success: false, message: error.message ||
                "Internal Server Error"
        })
    }
};

export const deleteProduct = async (req: Request, res: Response) => {

    const { _id = [] } = req.body || {};

    if (!Array.isArray(_id) || _id.length === 0) {
        return res.status(400).json({
            success: false,
            message: "An array of Product IDs is required."
        });
    }

    try {
        const result = await Category.deleteMany({ _id: { $in: _id } });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found to delete. They may have already been removed."
            });
        }

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} product(s) deleted successfully.`,
            data: result
        });

    } catch (error) {
        console.error("Error deleting products:", error);

        return res.status(500).json({
            success: false,
            message: "An internal server error occurred."
        });
    }
}

export const manageActiveStatus = async (req: Request, res: Response) => {
    const { _ids = [], isActive = true } = req?.body || {};

    if (!Array.isArray(_ids) || _ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: "An array of Product IDs is required."
        });
    }
    try {
        const filter = { _id: { $in: _ids } }
        const set = { $set: { isActive } }

        const data = await Category.updateMany(filter, set);
        if (data.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching products found to update."
            });
        }

        return res.status(200).json({
            success: true,
            message: `Successfully updated ${data.modifiedCount} product(s).`,
            data: data
        });


    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    let { _id, name } = req?.body || {};
    if (!_id) {
        return res.status(400).json({ success: false, message: "Category ID (_id) is required" });
    }

    if (!name) {
        return res.status(400).json({ success: false, message: "New category name is required" });
    }

    name = normalizeName(name);

    try {
      
        const updatedData = await Category.findByIdAndUpdate(
            _id, 
            { name: name }, 
            { new: true } 
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Category updated successfully", 
            data: updatedData 
        });

    } catch (error: any) {
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Something went wrong while updating data in the database" 
        });
    }
};