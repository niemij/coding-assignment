const deletePost = (postsService) => (req, res) => {
  const postId = req.params.id
  if (isNaN(postId)) {
    return res
      .status(400)
      .send({ message: 'Invalid postId' })
  }
  
  try {
    postsService.deletePost(postId)
    return res
      .status(200)
      .send({ message: `Successfully deleted post with id: ${postId}` })
  } catch (error) {
    console.error('🛑 deletePost', error)
    return res
      .status(500)
      .send({ message: `🛑 An internal error has occurred when deleting post with id: ${postId}` })
  }
}

export default deletePost
