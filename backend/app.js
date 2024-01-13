const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const authRoutes = require('./auth/authRoutes');
const cardRoutes = require('./cards/cardRoutes');
require('dotenv').config()


//express app 
const app = express();


// middleware
app.use(express.json());       

app.use(cors({withCredentials: true, Origin: true,})); 

app.use(cookieParser());

app.use((req, res, next)=>{     
  console.log(req.path, req.method);
  next();
})



// listen for requests + database connection 
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT))
    .then(() => console.log( 'Listening on port '+process.env.PORT+'. Database Connected.' ))
    .catch((err) => console.log(err));


// routes
app.use(authRoutes);
app.use('/cards',cardRoutes);
