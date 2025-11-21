const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//Cau hinh CORS cho phep client tu cac nguon khac truy cap vao API
app.use(cors());

//Cau hinh morgan de ghi lai log cho cac HTTP req
app.use(morgan('dev'));

//Cau hinh de express cos the doc thong tin gui qua body cua request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
// app.use("/api/v1", require("./routes")); //Trả về index.js trong routes
app.use("/api/v1", require("./routes")); //Trả về index.js trong routes

//Xu ly loi tap trung
//Loi request not found
app.use((req, res, next) => {
    const error = new Error(`Request not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

//Xử lý tất cả lỗi còn lại
app.use(require("./middlewares/errorHandler"));

module.exports = app;