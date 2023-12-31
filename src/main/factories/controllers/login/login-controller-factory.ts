import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorator/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  )
  return makeLogControllerDecorator(controller)
}
