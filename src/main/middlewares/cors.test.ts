import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect(
        'access-control-allow-methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      )
      .expect('access-control-allow-headers', 'X-Requested-With,content-type')
      .expect('access-control-allow-credentials', 'true')
  })
})
