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
  console.log('✅ db is ready')
  
  const deletePost = async (postId) => {
    try {
      const result = await pool.query("UPDATE co_posts SET status = 'DELETED' WHERE post_id = $1", [postId])
      return result
    } catch (error) {
        console.log('🛑 DELETE ERROR', error)
    }
  }
  
  const findById = async (postId) => {
    try {
      const result = await pool.query("SELECT * FROM co_posts WHERE post_id = $1", [postId])
      return result.rows[0]
    } catch (error) {
        console.log('🛑 QUERY ERROR, findById', error)
    }
  }
  
  const findByImpacterId = async (impacterId) => {
    try {
      const result = await pool.query("SELECT * FROM co_posts WHERE impacter_id = $1", [impacterId])
      return result.rows.filter((post) => post.status !== 'DELETED')
    } catch (error) {
        console.log('🛑 QUERY ERROR, findByImpacterId', error)
    }
  }

  const getAll = async () => {
    try {
      const result = await pool.query("SELECT * FROM co_posts")
      return result.rows.filter((post) => post.status !== 'DELETED')
    } catch (error) {
        console.log('🛑 QUERY ERROR, getAll', error)
    }
  }

  const save = async (post) => {
    try {
      if (post.post_id) { 
        const result = await pool.query("UPDATE co_posts " + 
        "SET description = $1, type = $2, status = $3, impacter_id $4, reaction_count = $5, data = $6, published_at = $7" +
        "WHERE post_id = $8" +
        "RETURNING post_id", [
          post.description,
          post.type,
          post.status,
          post.impacter_id,
          post.reaction_count,
          post.data, 
	        post.published_at,
          post.post_id
        ])
        return result
      } else {
        const result = await pool.query("INSERT INTO co_posts " +
        "(description, type, status, reaction_count, data, published_at) VALUES " +
        "($1, $2, $3, $4, $5, $6) RETURNING post_id", [
          post.description,
          post.type,
          post.status,
          post.reaction_count,
          post.data, 
	        post.published_at
        ])
	      return result
      }
    } catch (error) {
        console.log('🛑 SAVE ERROR', error)
    }
  }

  return {
    delete: deletePost,
    findById,
    findByImpacterId,
    getAll,
    save,
  }
}