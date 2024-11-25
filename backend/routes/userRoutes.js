import express from 'express';
import Post from '../model/post.js'
import app from "../app.js";

/*const express = require('express');*/
const router = express.Router();

router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  }

  const post = new Post({ title, content });

  post.save()
    .then(result => {
      res.status(201).json({
        success: true,
        postId: result._id,
      });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: 'Failed to create post.', error });
    });
});

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({success: true});
  });
});

export default router;
