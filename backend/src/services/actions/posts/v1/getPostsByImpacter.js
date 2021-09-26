const getPostsByImpacter = (postsService) => async (req, res) => {
  try {
    const impacterId = parseInt(req.params.impacterId)
    if (isNaN(impacterId)) {
      return res
      .status(400)
      .send({ message: 'Invalid impacterId' })
  }

  const posts = await postsService.getPostsByImpacterId(impacterId)
  return res
   .status(200)
   .send({ posts })
  } catch (error) {
    console.error('🛑 getPostsByImpacter', error)
    return res
      .status(500)
      .send({ message: `An internal error has occurred when getting posts by impacterId: ${impacterId}` })
  }
}


export default getPostsByImpacter