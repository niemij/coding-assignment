import request from 'supertest'
import { createApp }from '../../../app'

describe('Posts endpoint - delete', () => {
  let app
  beforeAll(async () => {
    app = await createApp()
  })
  
  afterAll(() => {
    app.close()
  })

  it('should (soft) delete the specified post', async () => {
    const result1 = await request(app)
      .delete('/posts/delete/10')
      .expect(200)
      
    const result2 = await request(app)
			.get('/posts/getById:10')
			.expect(200)

    expect(result1.body.data).toEqual('Deleted post: 10')
    expect(result2.body.data.status).toBe('DELETED')
  })
})

