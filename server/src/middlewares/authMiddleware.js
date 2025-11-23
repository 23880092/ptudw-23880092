const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const { User } = require("../models");
const { isTokenBlacklisted } = require("../utils/tokenBlackList");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; //bearer token

    if (!token) {
      throw new ApiError(401, "Thieu Token");
    }

    //kiem tra token co bi blacklist hay khong
    if (isTokenBlacklisted(token)) {
      throw new ApiError(401, "Token da bi vo hieu hoa");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new ApiError(401, "Nguoi dung khong ton tai");
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error = new ApiError(401, "Token khong hop le");
    } else if (error.name === "TokenExpiredError") {
      error = new ApiError(401, "Token da het han");
    }
    next(error);
  }
};

const requireAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Chua xac thuc");
    }

    if (!req.user.isAdmin) {
      throw new ApiError(403, "User Khong co quyen  thuc hien hanh dong nay");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateToken, requireAdmin };
