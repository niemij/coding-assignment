const getPostsByImpacter = (postsService) => async (req, res) => {
  try {
    const impacterId = parseInt(req.params.impacterId)
    if (isNaN(impacterId)) {
      return res
      .status(400)
      .send({ message: 'Invalid impacterId, must be a number' })
  }

  const posts = await postsService.getByImpacterId(impacterId)
  let response
    if (!posts) {
      response = { message: `No post with impacter id: ${impacterId}` }
    } else {
      response = posts
    }

  return res
   .status(200)
   .send({ message: 'Success', data: response })
  } catch (error) {
    console.error('🛑 getPostsByImpacter', error)
    return res
      .status(500)
      .send({ message: `🛑 An internal error has occurred when getting posts by impacterId: ${impacterId}` })
  }
}


export default getPostsByImpacter