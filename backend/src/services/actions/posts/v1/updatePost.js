const updatePost = (postsService) => async (req, res) => {
  const post_id = parseInt(req.params.id)
  const post = req.body
  const { description, type, data, status, reaction_count, published_at } = post
  
  try {
    const post = postsService.save(post_id)
	  
      return res
      .status(200)
      .body({
        ...(post_id && {post_id}),
        ...(description && {description}),
        ...(type && {type}),
        ...(data && {data}),
        ...(status && {status}),
        ...(reaction_count && {reaction_count}),
        ...(published_at && {published_at})
      })
      .send({ post })
	} catch (error) {
    console.error('🛑 updatePost', error)
	  return res
	  .status(500)
	  .send({ message: `🛑 An internal error has occurred when saving post` })
	}
  }

export default updatePost
