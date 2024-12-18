import { Request, Response, NextFunction } from 'express'
import CustomError from './CustomError'
import statusCodes from './statusCodes'

type ErrorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Response

const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message })
  } else {
    return res
      .status(statusCodes['Internal Server Error'])
      .send({ message: err.message })
  }
}

export default errorHandler
