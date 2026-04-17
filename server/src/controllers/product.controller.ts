import { Request, Response } from "express";
import Product from "../models/Products.models.js";


// @api/v1/product/post/getProduct

// {
//   "category": ["64a5c3f8e9f12d0045abc123"],
//   "filter": {
//     "vegetarian": true,
//     "priceRange": { "min": 100, "max": 500 },
//     "underOffer": true,
//     "inStock": true,
//     "minRating": 3,
//     "sort": "lowToHigh"
//   },
//   "show": { "limit": 20, "page": 2 }
// }

export const getProduct = async (req: Request, res: Response) => {
    const { category = [], filter = {}, show = { limit: 20, page: 1 } } = req?.body || {};

    try {

        let query: any = {};

        if (category && category.length > 0) {
            query.category = { $in: category };
        }

        // Price filter - using todayPrice
        if (filter?.priceRange) {
            const { min, max } = filter.priceRange;
            if (min !== undefined && max !== undefined) {
                query.todayPrice = { $gte: min, $lte: max };
            } else if (min !== undefined) {
                query.todayPrice = { $gte: min };
            } else if (max !== undefined) {
                query.todayPrice = { $lte: max };
            }
        }

        // Veg filter
        if (filter?.vegetarian !== undefined) {
            query.isVegetarian = filter.vegetarian;
        }

        // Under offer filter
        if (filter?.underOffer) {
            query.underOffer = true;
        }


        // In stock filter
        if (filter?.inStock) {
            query.stock = { $gt: 0 };
        }

        // Minimum rating filter
        if (filter?.minRating !== undefined && filter.minRating > 0) {
            query.rating = { $gte: filter.minRating };
        }
        query.isActive = true;

        const limit = Math.max(1, show?.limit || 20);
        const page = Math.max(1, show?.page || 1);
        const skip = (page - 1) * limit;


        // Sorting - using todayPrice
        let sortOption: any = {};
        if (filter?.sort) {
            switch (filter.sort) {
                case "lowToHigh":
                    sortOption = { todayPrice: 1 };
                    break;
                case "highToLow":
                    sortOption = { todayPrice: -1 };
                    break;
                case "newest":
                    sortOption = { createdAt: -1 };
                    break;
                case "topRated":
                    sortOption = { rating: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
        } else {
            sortOption = { createdAt: -1 };
        }


        const data = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);


        const total = await Product.countDocuments(query);

        if (data.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No products found matching your criteria.",
                data: [],
                pagination: {
                    total: 0,
                    page: page,
                    limit: limit,
                    totalPages: 0
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: `${data.length} records fetched successfully.`,
            data: data,
            pagination: {
                total: total,
                page: page,
                limit: limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// _id = ["anfkcbksh4354rfs" , "38yrfhvnishakbhv"]
// @api/v1/product/delete/_id
export const deleteProduct = async (req: Request, res: Response) => {

    const { _id = [] } = req.body || {};

    if (!Array.isArray(_id) || _id.length === 0) {
        return res.status(400).json({
            success: false,
            message: "An array of Product IDs is required."
        });
    }

    try {
        const result = await Product.deleteMany({ _id: { $in: _id } });

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

        const data = await Product.updateMany(filter, set);
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