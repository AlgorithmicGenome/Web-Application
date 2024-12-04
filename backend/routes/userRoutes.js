import express from 'express';
import Post from '../model/post.js'
import app from "../app.js";
import checkAuth from "../middleware/check-auth.js";

const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Assuming you have a Post model const router = express.Router();


router.post('/api/posts', checkAuth, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      creator: req.userData.userId, // From decoded token (if using JWT)
    });
    const createdPost = await post.save();
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Creating a post failed!' });
  }
});

router.put('/:id', checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      res.status(200).json({success: true});
    });
});

router.get('', (req, res, next) => {
  Post.find()
    .then(data => {
      res.status(200).json({
        success: true,
        data: data
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        success: false,
        message: 'data not found'
      });
    }
  });
});

router.delete('/:id', checkAuth,(req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({success: true});
  });
});

module.exports = router;
