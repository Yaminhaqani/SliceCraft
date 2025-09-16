import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import cloudinary from "../config/cloudinary";
import streamifier from 'streamifier';

export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.find().populate("base size toppings");
    res.json({ menu: menu });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, base, size, toppings, price } = req.body;
    const file = req.file; // uploaded image

    const errors: string[] = [];

    if (!name || typeof name !== "string") {
      errors.push("Name is required");
    }

    if (!base || !size) {
      errors.push("Base and Size are required");
    }

    if (!toppings || toppings.length === 0) {
      errors.push("At least one topping is required");
    }

    if (!price || price <= 0) {
      errors.push("Price must be a positive number");
    }

    if (!file) {
      errors.push("Image is required");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    if (!file || !file.buffer) {
      return res.status(400).json({
        success: false,
        message: "Image file is missing or corrupted",
      });
    }

    let imgUrl = "";

    try {
      // Upload buffer to Cloudinary using stream
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "SliceCraft/menu",
            resource_type: "image",
            public_id: `${name.trim().replace(/\s+/g, "_")}_${Date.now()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      imgUrl = (result as any).secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        success: false,
        message: "Image upload failed. Please try again.",
      });
    }

    const menuItem = new Menu({
      name: name.trim(),
      description,
      base,
      size,
      toppings,
      price,
      image: imgUrl,
    });

    await menuItem.save();

    res.status(201).json({
      success: true,
      message: "Menu item created successfully 🍕",
      menuItem,
    });
  } catch (error: any) {
    console.error("Error creating the menu item:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating the menu item" });
  }
};
