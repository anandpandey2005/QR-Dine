import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


const uploadOnCloudinary = async (localFilePath: any) => {
    try {
        if (!localFilePath) return null;


        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: `${process.env.STORE_NAME}/my_products`
        });

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary }