const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url || !request.body.title) {
    response.status(400).json({ error: "title and url are required" });
    return;
  }

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  response.json(blog);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = new Blog(request.body);

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog.likes,
    {
      new: true,
    }
  );
  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).json({ error: "title and url are required" });
});

module.exports = blogsRouter;
