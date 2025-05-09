require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.get("/api/blogs/:id", (request, response) => {
  const id = request.params.id;
  const blog = Blog.find((blog) => blog.id === id);
  response.json(blog);
});

const PORT = process.env.PORT ?? 3003;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server host: ${process.env.HOST}`);
    });
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error);
  });
