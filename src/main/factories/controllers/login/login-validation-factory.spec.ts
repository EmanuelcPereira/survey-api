import { EmailValidation } from '../../../../presentation/helper/validators/email-validation'
import { RequiredFieldValidation } from '../../../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../../../presentation/helper/validators/validation-composite'
import { type EmailValidator } from '../../../../presentation/protocols/email-validator'
import { type Validation } from '../../../../presentation/protocols/validation'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../presentation/helper/validators/validation-composite')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Login Validation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
