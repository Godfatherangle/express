const express = require('express');
const app = express();
app.use(express.json());

const posts = [
  { id: 1, title: 'Post 1', content: 'This is the first post.' },
  { id: 2, title: 'Post 2', content: 'This is the second post.' },
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET - Read a specific post by ID
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json(post);
  }
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    posts[postIndex] = { id: postId, title, content };
    res.json(posts[postIndex]);
  }
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
