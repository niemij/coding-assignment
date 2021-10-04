import { createPostsModel } from './posts'
import { mockPost,
  mockPostsByImpacter,
  mockDeletedPosts,
  mockSavePost,
  mockUpdatePost, 
} from '../test/mocks'

const mockQuery = jest.fn()
class Pool {
  query = mockQuery
}
const mockPg = { Pool }

let postsModel
describe('test models', () => {

  beforeAll(async () => {
    postsModel = await createPostsModel({ pg: mockPg })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should getById', async () => {
    mockQuery.mockImplementationOnce(() => ({ rows: [mockPost] }))
    const post = await postsModel.getById(1)

    expect(mockQuery).toHaveBeenCalledTimes(1)
    expect(post.post_id).toEqual(1)
  })

  it('should getByImpacterId', async () => {
    mockQuery.mockImplementationOnce(() => ({ rows: mockPostsByImpacter }))
    const postsByImpacter = await postsModel.getByImpacterId(1)
    
    expect(mockQuery).toHaveBeenCalledTimes(1)
    expect(postsByImpacter[0].post_id).toBe(1)
    expect(postsByImpacter.length).toBe(2)
  })

  it('should deletePost', async () => {
    mockQuery.mockImplementationOnce(() => ({ rows: mockDeletedPosts }))
    const result = await postsModel.delete(2)
    mockQuery.mock.calls[0]
    
    expect(mockQuery).toHaveBeenCalledTimes(1)
    expect(result.rows[1].status).toEqual('DELETED')
  })

  it('should save new post', async () => {
  	await postsModel.save(mockUpdatePost)
    const call = mockQuery.mock.calls[0]

  	expect(mockQuery).toHaveBeenCalledTimes(1)
  	expect(call[0]).toMatch(/INSERT INTO/)
  })
  
  it.skip('should update existing post', async () => {
    // TODO fix test
    mockQuery.mockImplementationOnce(() => (mockUpdatePost))
    const result = await postsModel.update(mockUpdatePost)

    expect(result).toHaveProperty('newValues')
    expect(result).toHaveProperty('beforeUpdate')

  })
})

