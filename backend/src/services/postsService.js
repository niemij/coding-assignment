export const createPostsService = ({ postsModel }) => {
  const deletePost = (postId) => postsModel.delete(postId)

  const getAll = () => postsModel.getAll()

  const getById = async (postId) => {
    const allPosts = await postsModel.getAll()
    const post = allPosts.find( (post) => post.post_id === postId )
    return post
  }

  const getByImpacterId = async (impacterId) => {
    const allPosts = await postsModel.getAll()
    const post = allPosts.find( (post) => post.impacter_id === impacterId )
    return post
  }

  const update = async (id, update) => {
    const postForUpdate = postsModel.findById(id)
    const updatedPost = {...postForUpdate, ...update}
    postsModel.save(id, updatedPost)
    return updatedPost
  }

  return {
    delete: deletePost,
    getAll,
    getById,
    getByImpacterId,
    update,
  }
}
