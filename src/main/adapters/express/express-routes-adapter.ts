/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type RequestHandler, type Response } from 'express'
import { type Controller, type HttpRequest } from '../../../presentation/protocols'

export const adaptRoute = (
  controller: Controller
): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    res.status(httpResponse.statusCode).json(httpResponse.body.message)
  }
}
