import request from 'supertest'
import { createApp } from '../../../app'

describe('Posts endpoint - getByPostId', () => {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  afterAll(() => {
    app.close
  })

	it('should return the matching post', async () => {
		const response = await request(app)
			.get('/posts/getPostsById/1')
			.expect(200)

    expect(response.body.data.post_id).toBe(1)
    expect(response.body.message).toBe('Success')
  })

  it('should return {} when post does not exist', async () => {
    const response = await request(app)
      .get('/posts/getPostsById:10000')
      .expect(200)

    expect(response.body.data).toBe({})
    expect(response.body.message).toBe('No post with id: 10000')
  })
})
