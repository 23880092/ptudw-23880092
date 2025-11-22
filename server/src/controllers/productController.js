const controller = {};
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const { Product, Category, Tag } = require("../models");
const { Op } = require("sequelize"); //Option lấy từ sequelize

controller.getAllProducts = async (req, res) => {
  let {
    search,
    categoryId,
    tagId,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = "price",
    sortOrder = "asc",
  } = req.query;
  //page = 1, limt = 10 để phân trang
  //sortBy = "price", sortOrder = "asc" để sắp xếp giá tăng dần

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const offset = (pageNum - 1) * limitNum;

  let options = {
    where: {},
    limit: limitNum,
    offset: offset,
    order: [[sortBy, sortOrder.toUpperCase()]], //Sắp xếp

    include: [
      {
        model: Category,
        // as: "category", //không định nghĩa alias trong model thì không cần cái này
        attributes: ["id", "name"],
        require: false, //Product nao khong co category se van hien thies: ['id', 'name']
      },
      {
        model: Tag,
        // as: "tags",  //không định nghĩa alias trong model thì không cần cái này
        through: { attributes: [] }, //Khong hien thi thong tin bang trung gian ProductTags
        attributes: ["id", "name"],
        require: false, //Product nao khong co tag se van hien thies: ['id', 'name']
      },
    ],
    distinct: true, //Để đảm bảo không lấy trình khi join với many-to-many
  };

  //Loc theo search
  if (search) {
    options.where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      { summary: { [Op.iLike]: `%${search}%` } },
    ];
  }

  //Loc theo categoryId
  if (categoryId) {
    if (isNaN(categoryId)) {
      throw new ApiError(400, "categoryId phai so nguyen");
    }
    categoryId = parseInt(categoryId);
    options.where.categoryId = categoryId;
  }

  //Loc theo tagId
  if (tagId) {
    if (isNaN(tagId)) {
      throw new ApiError(400, "tagId phai so nguyen");
    }
    tagId = parseInt(tagId);
    //Thêm điều kiện lọc tagId vào include của Tag
    options.include[1].where = { id: tagId };
    options.include[1].required = true; //Chỉ lấy sản phẩm có tagId này
  }

  //Loc theo gia
  if (minPrice) {
    if (isNaN(minPrice)) {
      throw new ApiError(400, "minPrice phai la so");
    }
    minPrice = parseFloat(minPrice); // gán đúng biến
    options.where.price = { [Op.gte]: minPrice };
  }
  if (maxPrice) {
    if (isNaN(maxPrice)) {
      throw new ApiError(400, "maxPrice phai la so");
    }
    maxPrice = parseFloat(maxPrice);
    options.where.price = { [Op.lte]: maxPrice };
  }

  //Sorting
  const validSortByFields = ["price", "name", "createdAt"];
  const validSortOrder = ["asc", "desc"];
  if (
    validSortByFields.includes(sortBy) &&
    validSortOrder.includes(sortOrder)
  ) {
    options.order = [[sortBy, sortOrder.toUpperCase()]];
  } else {
    //throw new ApiError(400, "Thuoc tinh sort khong hop le");
    sortBy = "price";
    sortOrder = "asc";
    options.order = [["price", "ASC"]]; //Mặc định sắp xếp theo giá tăng dần
  }

  //truy van lay san pham
  const { count, rows } = await Product.findAndCountAll(options);

  //Kiem tra neu khong co san pham nao
  if (rows.length === 0) {
    throw new ApiError(404, "Khong tim thay san pham nao");
  }

  //Tra ve ket qua
  const reponseData = {
    products: rows,
    pagingnation: {
      totalItems: count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      limit: limitNum,
    },
    filter: {
      search: search || "",
      categoryId: categoryId || null,
      tagId: tagId || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      limit: limitNum,
      page: pageNum,
      sortBy: sortBy,
      sortOrder: sortOrder,
    },
  };
  res
    .status(200)
    .json(
      new ApiResponse(200, reponseData, "Tim Danh sach san pham thanh cong")
    );
};

controller.getProductById = async (req, res) => {
  let { id } = req.params;
  if (isNaN(id)) {
    throw new ApiError(400, "Product ID phai la so nguyen");
  }
  id = parseInt(id);
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        require: false,
      },
      {
        model: Tag,
        through: { attributes: [] },
        attributes: ["id", "name"],
        require: false,
      },
    ],
  });

  if (!product) {
    throw new ApiError(404, "Khong tim thay san pham");
  }
  res
    .status(200)
    .json(new ApiResponse(200, product, "Tim san pham thanh cong"));
};

controller.createProduct = async (req, res) => {
  const { name, description, price, categoryId, imagePath, summary } = req.body;

  if (!name) {
    throw new ApiError(400, "Name khong duoc de trong");
  }

  if (!price) {
    throw new ApiError(400, "Price khong duoc de trong");
  }

  if (isNaN(price) || isNaN(categoryId)) {
    throw new ApiError(400, "Price va Category ID phai la so");
  }
  if (categoryId && isNaN(categoryId)) {
    throw new ApiError(400, "Category ID phai la so nguyen");
  }

  let newProduct = {
    name,
    price,
  };

  if (description) newProduct.description = description;
  if (categoryId) newProduct.categoryId = parseInt(categoryId);
  if (imagePath) newProduct.imagePath = imagePath;
  if (summary) newProduct.summary = summary;

  newProduct = await Product.create(newProduct);
  res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Tao san pham thanh cong"));
};

controller.updateProduct = async (req, res) => {
  let { id } = req.params;
  let { name, description, price, categoryId, imagePath, summary } = req.body;

  if (!name) {
    throw new ApiError(400, "Name khong duoc de trong");
  }

  if (!price) {
    throw new ApiError(400, "Price khong duoc de trong");
  }

  if (isNaN(price) || isNaN(categoryId)) {
    throw new ApiError(400, "Price va Category ID phai la so");
  }
  if (categoryId && isNaN(categoryId)) {
    throw new ApiError(400, "Category ID phai la so nguyen");
  }

  id = parseInt(id);
  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Khong tim thay san pham");
  }

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) {
    if (isNaN(price)) {
      throw new ApiError(400, "Price phai la so");
    }
    product.price = parseFloat(price);
  }
  if (categoryId) {
    if (isNaN(categoryId)) {
      throw new ApiError(400, "Category ID phai la so nguyen");
    }
    categoryId = parseInt(categoryId);
    let category = await Category.findByPk(categoryId);
    if (!category) {
      throw new ApiError(404, "Khong tim thay category voi ID da cho");
    }
    product.categoryId = parseInt(categoryId);
  }
  if (imagePath) product.imagePath = imagePath;
  if (summary) product.summary = summary;

  await product.save();

  res.json(new ApiResponse(200, product, "Cap nhat san pham thanh cong"));
};

controller.deleteProduct = async (req, res) => {
  let { id } = req.params;
  if (isNaN(id)) {
    throw new ApiError(400, "Product ID phai la so nguyen");
  }
  id = parseInt(id);
  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Khong tim thay san pham");
  }
  await Product.destroy({ where: { id: id } });
  res.json(new ApiResponse(204, null, "Xoa san pham thanh cong"));
};

module.exports = controller;
