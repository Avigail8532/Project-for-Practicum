const errorHandler = (err, req, res, next) => {
    console.error("❌ Global Error Handler Caught:");
    console.error(err.stack || err.message || err);

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error.";
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        status: statusCode,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}

module.exports = errorHandler;
