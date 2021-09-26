import { createApp } from 'app'

try {
  const app = createApp()
    .then(app => app())
} catch (error) {
  console.error(error)
}
