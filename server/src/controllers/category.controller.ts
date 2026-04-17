import { Request, Response } from "express";
import Category from "../models/Category.models.js";


export const getCategory = async (req: Request, res: Response) => {
    try {
        const data = await Category.find({ isActive: true });
        if (data.length === 0) {
            return res.status(200).json({ success: true, message: "No data found", data: null })
        }
        return res.status(200).json({ success: true, Message: `${data.length} records fetched` })
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


// _id = ["anfkcbksh4354rfs" , "38yrfhvnishakbhv"]
// @api/v1/product/manage-active/_id
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
        const set = { isActive: { $set: isActive } }

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