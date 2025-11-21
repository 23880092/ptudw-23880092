const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');

router.use('/products', productRouter);
//Sau nay co them categoryRouter thi chi can import va su dung tuong tu nhu tren

module.exports = router;