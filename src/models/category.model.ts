// Finance Tracker App
import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ["predefined", "custom"],
        default: "predefined", // Predefined categories are available to all users.
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, // Null for predefined categories, populated for custom ones.
    },
    icon: {
        type: String,
        default: null,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null, // To support subcategories.
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Ensure uniqueness of category name per user
CategorySchema.index({ name: 1, userId: 1 }, { unique: true });

export const Category = mongoose.model("Category", CategorySchema);
