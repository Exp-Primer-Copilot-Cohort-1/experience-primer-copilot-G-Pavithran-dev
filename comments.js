//Create a web server
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Serve static files from the public directory
app.use(express.static('public'))

// Get the comments
app.get('/comments', (req, res) => {
  console.log('Get comments')
  res.sendFile(path.join(__dirname, 'comments.json'))
})

// Post a comment
app.post('/comments', (req, res) => {
  console.log('Post comment')
  let comments = fs.readFileSync('comments.json')
  comments = JSON.parse(comments)
  comments.push(req.body)
  fs.writeFileSync('comments.json', JSON.stringify(comments))
  res.end()
})

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
