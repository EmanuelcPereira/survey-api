import { hash } from 'bcrypt'
import { type Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/log-mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return 200 on signUp', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Emanuel Pereira',
          email: 'u1cJj@example.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'Emanuel Pereira',
        email: 'u1cJj@example.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'u1cJj@example.com',
          password: 'any_password'
        })
        .expect(200)
    })

    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'u1cJj@example.com',
          password: 'any_password'
        })
        .expect(401)
    })
  })
})
