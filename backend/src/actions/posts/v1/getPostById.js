const getPostById = (postsService) => async (req, res)=> {
  const postId = parseInt(req.params.postId)
  try {
    if (isNaN(postId)) {
      return res
      .status(400)
      .send({ message: 'Invalid postId, must be a number' })
    }
    
    const post = await postsService.getById(postId)
    let response
    if (!post) {
      response = { message: `No post with id: ${postId}`, data: {} }
    } else {
      response = { message: 'Success',  data: response }
    }
    
    return res
      .status(200)
      .send(response)
  } catch (error) {
    console.error('🛑 getPostById', error)
    return res
      .status(500)
      .send({ message: `🛑 An internal error occurred when getting post with id: ${postId}`, error })
  }
}

export default getPostById
