import dotenv from "dotenv/config";
// dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

const app = express();
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
// app.use(cors());


app.use('/posts',postRoutes);
app.use("/users",userRoutes);
const CONNECTION_URL = "mongodb+srv://Santhosh2002:Santhosh2002@cluster0.kdf8fpj.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=>{
        console.log(`server listening at ${PORT}`);
    }) )
    .catch((error)=>{
        console.log(error.message)
    } );

