const controller = {};
const { Product, Category } = require("../models");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

controller.getAllCategories = async (req, res) => {
  const options = {
    attributes: ["id", "name"],
    include: [{ model: Product, attributes: ["id"] }],
  };
  const categories = await Category.findAll(options);

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // await sleep(5000); // Simulate delay of 1 second

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Lay Danh muc thanh cong"));
};

module.exports = controller;
