import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helper/http-helper'
import { } from '../signUp/signUp-protocols'
import {
  type Authentication,
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse
} from './login-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accesToken = await this.authentication.auth(email, password)
      if (!accesToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
