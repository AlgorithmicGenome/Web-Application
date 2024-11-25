import Post from "../models/Post.js";

/*export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { name, email, password } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}*/
// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts", details: err.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save(); // Save the post to the database
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post", details: err.message });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, author },
        { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post", details: err.message });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post", details: err.message });
  }
};
