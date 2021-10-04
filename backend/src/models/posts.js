export const createPostsModel = async ({ pg }) => {
  const Pool = pg.Pool
  const pool = new Pool({
    user: 'dev',
    host: 'localhost',
    database: 'impacter-posts-dev',
    password: 'dev',
    port: 5435,
  })

  await pool.query("SELECT 'test' as name")
  // console.log('✅ db is ready')
  
  const deletePost = async (postId) => {
    try {
      const response = await pool.query("UPDATE co_posts SET status = 'DELETED' WHERE post_id = $1", [postId])
      return response
    } catch (error) {
        console.log('🛑 DELETE ERROR', error)
    }
  }
  
  const getById = async (postId) => {
    try {
      const response = await pool.query("SELECT * FROM co_posts WHERE post_id = $1", [postId])
      return response.rows[0]
    } catch (error) {
        console.log('🛑 QUERY ERROR, getById', error)
    }
  }
  
  const getByImpacterId = async (impacterId) => {
    try {
      const response = await pool.query("SELECT * FROM co_posts WHERE impacter_id = $1", [impacterId])
      return response.rows.filter((post) => post.status !== 'DELETED')
    } catch (error) {
        console.log('🛑 QUERY ERROR, getByImpacterId', error)
    }
  }

  const getAll = async () => {
    try {
      const response = await pool.query("SELECT * FROM co_posts")
      return response.rows.filter((post) => post.status !== 'DELETED')
    } catch (error) {
        console.log('🛑 QUERY ERROR, getAll', error)
    }
  }

  const update = async (post) => {
    try {
      const currentValueResponse = await pool.query("SELECT * FROM co_posts WHERE post_id = $1", [post.post_id])
      let publishedAt = post.publishedAt
      if (post.publishedAt === undefined) publishedAt = currentValueResponse.publishedAt 
      
      const updateWith = {
        description: (post.description || currentValueResponse.description),
        type: (post.type ?? currentValueResponse.type),
        status: (post.status ?? currentValueResponse.status),
        data: (post.data ?? currentValueResponse.data),
        reaction_count: (post.reactionCount ?? currentValueResponse.reaction_count),
        published_at: (publishedAt),
        post_id: post.post_id,
      }
      
      const response = await pool.query("UPDATE co_posts " + 
      "SET description = $1, type = $2, status = $3, data = $4, reaction_count = $5, published_at = $6" +
      "WHERE post_id = $7" +
      "RETURNING *", [
        updateWith.description,
        updateWith.type,
        updateWith.status,
        JSON.stringify(updateWith.data), 
        updateWith.reaction_count,
        updateWith.published_at,
        updateWith.post_id
      ])
      return { newValues: response, beforeUpdate: currentValueResponse }
    } catch (error) {
      console.log('🛑 UPDATE ERROR', error)
    }
  }
  
  const save = async (post) => {
    try {
      const response = await pool.query("INSERT INTO co_posts " +
      "(data, description, impacter_id, reaction_count, status, published_at, type) VALUES " +
      "($1, $2, $3, $4, $5, $6, $7) RETURNING post_id", [
        JSON.stringify(post.data), 
        post.description,
        post.impacter_id,
        post.reaction_count,
        post.status,
        post.published_at,
        post.type
      ])
	      return response
    } catch (error) {
        console.log('🛑 SAVE ERROR', error)
    }
  }

  return {
    delete: deletePost,
    getById,
    getByImpacterId,
    getAll,
    update,
    save,
  }
}