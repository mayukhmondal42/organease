const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const path = require("path");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    if (!req.file) {
      return res.json({ error: "All fields must be required - Image missing" });
    }
    let cImage = req.file.filename;
    const filePath = path.join(__dirname, "../../public/uploads/categories/", cImage);

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, () => {});
      return res.json({ error: "All fields must be required" });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await categoryModel.findOne({ cName: cName });
        if (checkCategoryExists) {
          fs.unlink(filePath, () => {});
          return res.json({ error: "Category already exists" });
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
            cStatus,
            cImage,
          });
          await newCategory.save();
          return res.json({ success: "Category created successfully" });
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong" });
      }
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let edit = await categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      if (edit) {
        return res.json({ success: "Category edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All fields must be required" });
    } else {
      try {
        let deletedCategoryFile = await categoryModel.findById(cId);
        const filePath = path.join(__dirname, "../../public/uploads/categories/", deletedCategoryFile.cImage);
        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          fs.unlink(filePath, () => {});
          return res.json({ success: "Category deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;