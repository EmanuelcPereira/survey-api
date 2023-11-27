import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { type Authentication } from '../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const accountMomngoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMomngoRepository, bcryptAdapter, jwtAdapter, accountMomngoRepository)
}
