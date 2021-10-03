import { createApp } from './app.js'

createApp()
	.catch((error) => {
	  console.error('🛑 error after creating the app', error)
})

