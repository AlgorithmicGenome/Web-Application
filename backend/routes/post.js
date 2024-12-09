/*
import express from 'express';
import Post from '../model/post.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

// Create a post
router.post('/api/posts', checkAuth, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      creator: req.userData.userId, // From decoded token
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

// Update a post
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
    };
    const result = await Post.updateOne({ _id: req.params.id }, post);
    if (result.matchedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Updating post failed!' });
  }
});

// Get all posts
router.get('', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Fetching posts failed!' });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ success: false, message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Fetching post failed!' });
  }
});

// Delete a post
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Deleting post failed!' });
  }
});

export default router;
*/
