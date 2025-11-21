const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    //Chuan bi response loi
    const response = {
        statusCode: statusCode,
        message: err.message || 'An unexpected Error occurred',
        data: err.data || null,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : "",
    }

    //Log loi ra console de dev fix
    console.error(err);

    //Gui response loi ve client
    res.status(statusCode).json(response);
}

module.exports = errorHandler;