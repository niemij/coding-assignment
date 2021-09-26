import pg from 'pg'
const express = require('express')
const bodyParser = require('body-parser')
const { createPostsModel } = require('./models/posts.js')
const { createPostsService } = require('./services/postsService.js')

const { getPosts, getPostById, getPostsByImpacter, updatePost, deletePost } = require('./actions/posts/v1/index.js')

const port = 3000

export const createApp = async () => {
  const app = express()
  const postsModel = await createPostsModel({ pg })
  const postsService = createPostsService({ postsModel })

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.get('/posts/getAll', getPosts(postsService))
  app.get('/posts/getPostById/:postId', getPostById(postsService))
  app.get('/posts/getPostByImpacter/:impacterId', getPostsByImpacter(postsService))
  app.put('/posts/:id', updatePost(postsService))
  app.delete('/posts/delete/:id', deletePost(postsService))

  await startApp(app)
  return app
}

const startApp = (app) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve(app)
      console.log(`App running on port ${port}.`)
    })
  })
}
