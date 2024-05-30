import { Request, Response, NextFunction } from "express";

export function endpointValidation(propertyList: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
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
    } catch (err) {
      next(err);
    }
  };
}
