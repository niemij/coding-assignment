const savePost = (postsService) => async (req, res) => {
	const post = req.body
  // TODO type check for all data needed
      
	try {
    const response = await postsService.save(post)
    return res
      .status(200)
      .send({ message: 'Success', data: response })
  } catch (error) {
    console.error('🛑 savePost', error)
    return res
    .status(500)
    .send({ message: `🛑 An internal error has occurred when saving post ${error}` })
  }
}
export default savePost
      