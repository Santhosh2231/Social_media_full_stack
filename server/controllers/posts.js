
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req,res)=>{
    // res.send("This works")
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages.length);
        res.status(200).json(postMessages);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req,res)=>{

    const {searchQuery, tags} = req.query;


    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ $or : [{title},{tags: {$in: tags.split(",")}}] })

        res.json({data: posts});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res)=>{
    // res.send('Post Creation ');
    const post = req.body;
    console.log(post);
    const newPost = new PostMessage({...post, creator: req.userId ,createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res)=>{
    const id = req.params.id;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    
    const updatePost = await PostMessage.findByIdAndUpdate(id,{...post,id} , {new:true});
    res.json(updatePost);

}

export const deletePost = async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndDelete(id);
    res.json({message: "Post deleted Successfully"});

}

export const likePost = async (req,res)=>{
    const id = req.params.id;

    if(!req.userId) return res.json({message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id === String(req.userId)); 

    if(index === -1){
        // like the post
        post.likes.push(req.userId);
    }else{
        // dislike a post

        post.likes = post.likes.filter((id)=> id != String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost);

}