import {
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type AddAccountRepository,
  type Hasher,
  type LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const foundAccount = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (foundAccount) {
      return null
    }

    const hashedPassword = await this.hasher.hash(accountData.password)

    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return account
  }
}
