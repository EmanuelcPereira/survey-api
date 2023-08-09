import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send(req.body)
    })

    await request(app).get('/test_cors').expect('access-control-allow-origin', '*')
  })
})
