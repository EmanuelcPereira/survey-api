/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type RequestHandler, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (
  controller: Controller
): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
