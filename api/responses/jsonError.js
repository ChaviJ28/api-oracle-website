module.exports = function jsonError(errorArray) {
    this.res.status(200);

    this.res.json({
        success: false,
        error: errorArray
    });
}