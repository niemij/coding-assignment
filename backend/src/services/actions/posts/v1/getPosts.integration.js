import request from 'supertest'
const { createApp } = require('../../../app')

describe('Posts endpoint - getAll', () => {
  let app
  beforeAll(async () => {
    app = await createApp()
  })
  it('should return all posts', async () => {
    const response = await request(app)
      .get('/posts/getAll')
      .expect(200)
      
      expect(response.body.posts.length).toBe(760)
  })
})
