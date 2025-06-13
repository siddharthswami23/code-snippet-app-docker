const express = require('express');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const UserRouter = require('./routes/user.routes');
const SnippetRouter = require('./routes/snippet.routes');
const CommentRouter = require('./routes/comment.routes');


const PORT = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
ConnectDB()
console.log("Mongo URI:", process.env.MONGO_URI);


app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/user', UserRouter)
app.use('/api/snippet', SnippetRouter)
app.use('/api/comment', CommentRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})