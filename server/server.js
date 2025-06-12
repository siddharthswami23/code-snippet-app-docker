const express = require('express');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
const ConnectDB = require('./config/db'); 


const PORT = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
ConnectDB()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})