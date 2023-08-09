import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_cotent_type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_cotent_type')
      .expect('content-type', /json/)
  })

  test('should return content type as xml', async () => {
    app.get('/test_cotent_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_cotent_type_xml')
      .expect('content-type', /xml/)
  })
})
