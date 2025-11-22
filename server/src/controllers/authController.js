const controller = {};
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const { User } = require("../models");
const { Op } = require("sequelize"); //Option lấy từ sequelize
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

controller.register = async (req, res) => {
    // Registration logic here
    const { firstName, lastName, password, confirmPassword, email, phoneNumber } =
        req.body;

    console.log(req.body);

    //Kiem tra thong tin co hop le hay khong
    if (!firstName || !lastName || !password || !confirmPassword || !email) {
        throw new ApiError(400, "Vui long dien day du thong tin");
    }

    //Kiem tra format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Email khong hop le");
    }

    //Kiem tra chieu dai password toi thieu 6 ky tu
    if (password.length < 6) {
        throw new ApiError(400, "Password phai co it nhat 6 ky tu");
    }

    //Kiem tra password va confirmPassword co giong nhau khong
    if (password !== confirmPassword) {
        throw new ApiError(400, "Password va Confirm Password khong giong nhau");
    }

    //Kiem tra email da ton tai
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(409, "Email da duoc su dung");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Tao user moi
    const newUser = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        phoneNumber,
        role: "user",
    });

    //Tra ve ket qua cho nguoi dung ma khong can tra ve password
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;

    return res
        .status(201)
        .json(new ApiResponse(201, userResponse, "Dang ky thanh cong"));
};

controller.login = async (req, res) => {
    // Login logic here
    const { email, password } = req.body;

    //Kiem tra thong tin co hop le hay khong
    if (!email || !password) {
        throw new ApiError(400, "Email va mat khau la bat buoc");
    }

    //Tim user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(401, "Email khong ton tai");
    }

    //Kiem tra mat khau
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Mat khau khong dung");
    }

    //Tao json web token de xac thuc (bo qua phan nay trong do an)
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1d" }
    );

    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: userResponse, token },
                "Dang nhap thanh cong"
            )
        );
};

module.exports = controller;
