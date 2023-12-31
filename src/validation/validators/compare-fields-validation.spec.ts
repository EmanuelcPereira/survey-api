import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('compare Fields Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })

    expect(error).toBeFalsy()
  })
})
