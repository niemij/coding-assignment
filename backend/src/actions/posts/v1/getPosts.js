const getPosts = (postsService) => async (req, res ) => {
  try {
    const posts = await postsService.getAll()
    return res
      .status(200)
      .send({ message: 'Success', data: posts })
  } catch (error) {
    console.error('🛑 getPosts', error)
    return res
      .status(500)
      .send({ message: '🛑 An internal error has occurred when getting posts' })
  }
}

export default getPosts