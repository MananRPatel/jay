const express = require('express');
const app = express();
const cors = require('cors')
const auth = require('./router/auth');
require('dotenv').config();
const port = process.env.PORT || 3000

app.use('/auth',auth);
app.use(express.json())
app.use(cors())

app.use(express.json());
app.listen(port,()=>{
console.log(` server running on http://localhost:${port}`);
}); 