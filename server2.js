import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT //

// fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// serve the main page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

// Example of a route that throws an error
app.get('/fail', (req, res) => {
    throw new Error('Ooops!')
})