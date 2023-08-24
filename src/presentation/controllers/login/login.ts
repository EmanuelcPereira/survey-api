import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helper/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signUp/signUp-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
