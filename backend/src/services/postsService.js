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
    const postsByImpacter = allPosts.filter( (post) => post.impacter_id === impacterId )
    return postsByImpacter
  }

  const update = async (id, update) => {
    const postToUpdate = postsModel.getById(id)
    const updatedPost = {...postToUpdate, ...update}
    postsModel.update(id, updatedPost)
    return updatedPost
  }
  
  const save = async (post) => {
    postsModel.save(post)
    return post
  }

  return {
    delete: deletePost,
    getAll,
    getById,
    getByImpacterId,
    update,
    save,
  }
}
