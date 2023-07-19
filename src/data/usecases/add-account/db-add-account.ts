import {
  type Encrypter,
  type AddAccountModel,
  type AddAccount,
  type AccountModel,
  type AddAccountRepository
} from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return await Promise.resolve(null)
  }
}
