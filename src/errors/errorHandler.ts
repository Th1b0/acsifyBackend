import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
