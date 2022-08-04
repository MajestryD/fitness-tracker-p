const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
const store = new MongoDBStore({
  uri:uri,
  collections: 'sessions'
})

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SERCRET,
  resave:false,
  saveUninitialized:false,
  store: store
}))



const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./src/route/exercise');

app.use('/exercise', exerciseRouter);




app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
