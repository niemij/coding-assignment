import request from 'supertest'
const { createApp } = require('../../../app')

describe('Posts endpoint - getByPostId', () => {
  let app
  beforeAll(async () => {
    app = await createApp()
  })

	it('should return the matching post', async () => {
		const response = await request(app)
			.get('posts/getById:1')
			.expect(200)
		})

		it('should return 404 when post does not exist', async () => {
		const response = await request(app)
			.get('posts/getById:1000')
			.expect(404)
		})
})
