import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bccrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

const salt = 12
const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut(salt)
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})
