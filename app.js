const express = require('express');
const app = express();
const cors = require('cors')
const auth = require('./router/auth');
const validator = require('./router/validator');

require('dotenv').config();
const port = process.env.PORT || 3000

const corsOptions = {
    origin: true, // Allow all origins
    credentials: true // Allow cookies and credentials in requests
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',auth);
app.use('/db',validator);

app.listen(port,()=>{
console.log(` server running on http://localhost:${port}`);
}); 