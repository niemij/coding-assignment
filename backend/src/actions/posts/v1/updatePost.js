const updatePost = (postsService) => async (req, res) => {
  const post = req.body
  const postId = parseInt(req.params.postId)
  try {
    if (isNaN(postId)) {
      return res
      .status(400)
      .send({ message: 'Invalid postId, must be a number' })
    }

    const response = await postsService.update({ post_id: postId, ...post })
    return res
      .status(200)
      .send({ message: 'Success', data: response})
    } catch (error) {
      console.error('🛑 updatePost', error)
      return res
        .status(500)
        .send({ message: `🛑 An internal error has occurred when updating post` })
  }
}
export default updatePost
