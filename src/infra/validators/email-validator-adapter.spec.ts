import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@gmail.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct values', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@gmail.com')

    expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})
