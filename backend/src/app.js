import pg from 'pg'
import express from 'express'
import bodyParser from 'body-parser'
import { createPostsModel } from './models/posts.js'
import { createPostsService } from './services/postsService.js'

import { 
  deletePost,
  getPostById,
  getPosts,
  getPostsByImpacter,
  savePost,
  updatePost,
} from './actions/posts/v1/index.js'

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

  app.get('/posts/v1/getAll', getPosts(postsService))
  app.get('/posts/v1/getPostById/:postId', getPostById(postsService))
  app.get('/posts/v1/getPostsByImpacter/:impacterId', getPostsByImpacter(postsService))
  app.put('/posts/v1/update/:postId', updatePost(postsService))
  app.put('/posts/v1/save', savePost(postsService))
  app.delete('/posts/v1/delete/:postId', deletePost(postsService))

  return await startApp(app)
}

const startApp = (app) => {
  return new Promise((resolve, reject) => {
    try {
      app.listen(port, () => {
        console.log(`App running on port ${port}.`)
        resolve(app)
      })
    } catch {
      reject("error when starting the app")
    }
  })
}
