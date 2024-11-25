import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./model/post.js";
import postRoutes from "./routes/userRoutes.js";
/*import cors from 'cors';*/







/*dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Database Connected Successfully.');
    app.listen(PORT, () => {
      console.log('Server is Running on Port ${PORT}');
    });
  })
  .catch((error) => console.log(error));*/


mongoose.connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log('Database Connected Successfully.');
  }).catch(() => {
  console.log('Server is Running on Port ${PORT}');
});
const app= express();
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false})); //used for URL encoding, e.i. Hello%20World%26

//adding header data
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postRoutes);


export default app;
