"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = `Internal server error on ${req.method} ${req.path}`;
    if (err.status) {
        status = err.status;
    }
    if (err.message) {
        message = `${err.message} on ${req.method} ${req.path}`;
    }
    return res.status(status).json({ Error: message });
};
exports.errorHandler = errorHandler;
