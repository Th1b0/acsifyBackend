"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointValidation = void 0;
function endpointValidation(propertyList) {
    return (req, res, next) => {
        try {
            propertyList.forEach((property) => {
                if (!req.body[property]) {
                    throw {
                        status: 400,
                        message: `Missing data: ${property}`,
                    };
                }
            });
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
exports.endpointValidation = endpointValidation;
