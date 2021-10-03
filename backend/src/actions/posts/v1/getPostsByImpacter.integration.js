import request from "supertest";

describe('Posts endpoint - getAllPostsByImpacter', () => {
  let app

  beforeAll(async () => {
    app = await createApp()
  })

  afterAll(() => {
    app.close
  })

	it('should return all posts by impacter', async () => {
		const response = await request(app)
			.get('/posts/getPostsByImpacter/1')
			.expect(200)

		expect(response.body.data.length).toBe(40)
  })

		it('should return {} when no posts exist', async () => {
		  const response = await request(app)
        .get('/posts/getPostsByImpacter/1000')
        .expect(200)
      
      expect(response.body.data).toBe([])
  })
})
