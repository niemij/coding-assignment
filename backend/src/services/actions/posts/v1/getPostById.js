const getPostById = (postsService) => async (req, res)=> {
  const postId = parseInt(req.params.id)
  try {
    if (isNaN(postId)) {
      return res
	.status(400)
	.send({ message: 'Invalid postId' })
    }

    const post = await postsService.getPostById(postId)
    return res
      .status(200)
      .send({ post })
  } catch (error) {
    console.error('🛑 getPostById', error)
    return res
      .status(500)
      .send({ message: `🛑 An internal error occurred when getting post with id: ${postId}` })
  }
}

export default getPostById
