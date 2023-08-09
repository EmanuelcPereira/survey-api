import { type NextFunction, type Request, type Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('access-control-allow-headers', 'X-Requested-With,content-type')
  res.setHeader('access-control-allow-credentials', 'true')
  next()
}
