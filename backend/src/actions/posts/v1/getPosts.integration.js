import request from 'supertest'
import { createApp } from '../../../app'

describe('Posts endpoint - getAll', () => {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  afterAll(() => {
    app.close
  })

  it('should return all posts', async () => {
    const response = await request(app)
      .get('/posts/getAll')
      .expect(200)
      
    expect(response.body.data.length).toBe(760)
    expect(response.body.message).toBe('Success')
  })
})
