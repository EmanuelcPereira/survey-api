import { type AccountModel } from '../../../domain/models/account'
import { type AddAccountModel, type AddAccount } from '../../../domain/usecases/addAccount'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve(null)
  }
}
