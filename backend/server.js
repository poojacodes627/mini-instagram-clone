const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let posts = [
  {
    id: 1,
    title: "Welcome Post",
    content: "This is first post 🚀",
    likes: 0
  }
];

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// ADD new post
app.post("/posts", (req, res) => {

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    likes: 0
  };

  posts.push(newPost);

  res.json({
    message: "Post Added",
    post: newPost
  });
});

// DELETE post
app.delete("/posts/:id", (req, res) => {

  const id = parseInt(req.params.id);

  posts = posts.filter(post => post.id !== id);

  res.json({
    message: "Post Deleted"
  });
});

// LIKE post
app.put("/posts/:id/like", (req, res) => {

  const id = parseInt(req.params.id);

  const post = posts.find(post => post.id === id);

  if (post) {

    post.likes += 1;

    res.json({
      message: "Post Liked",
      likes: post.likes
    });

  } else {

    res.status(404).json({
      message: "Post Not Found"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});