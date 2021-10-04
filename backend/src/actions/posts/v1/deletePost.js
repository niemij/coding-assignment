const deletePost = (postsService) => (req, res) => {
  const postId = req.params.postId
  if (isNaN(postId)) {
    return res
      .status(400)
      .send({ message: 'Invalid postId, must be a number' })
  }
  
  try {
    postsService.delete(postId)
    return res
      .status(200)
      .send({ message: 'Success', data: `Deleted post: ${postId}` })
  } catch (error) {
    console.error('🛑 deletePost', error)
    return res
      .status(500)
      .send({ message: `🛑 An internal error has occurred when deleting post with id: ${postId}` })
  }
}

export default deletePost
