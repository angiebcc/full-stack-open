const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const assert = require("node:assert");
const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returns all blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test("blogs have id property but not _id", async () => {
  const response = await api.get("/api/blogs");

  assert(typeof response.body[0].id === "string");
  assert(typeof response.body[0]._id === "undefined");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "hwllo world",
    author: "Diego",
    url: "diego.com",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201) // status code 201 means the blogs has been created
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, 3);

  const latestBlog = blogsAtEnd[blogsAtEnd.length - 1];

  assert.deepStrictEqual(latestBlog, { ...newBlog, id: latestBlog.id });
});

test("if there are no likes it is initialized with 0 ", async () => {
  const newBlog = {
    title: "hwllo world",
    author: "Diego",
    url: "diego.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("if no has url or title return 400  ", async () => {
  const newBlog = {
    author: "Diego",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("update likes of the blog", async () => {
  const newBlog = {
    title: "hwllo world",
    author: "Diego",
    url: "diego.com",
    likes: 2,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201) // status code 201 means the blogs has been created
    .expect("Content-Type", /application\/json/);

  const updateBlog = {
    title: "hwllo world",
    author: "Diego",
    url: "diego.com",
    likes: 12,
  };

  await api
    .put(`/api/blogs/${response.body.id}`)
    .send(updateBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("deleting a blog", async () => {
  const newBlog = {
    title: "hwllo world",
    author: "Diego",
    url: "diego.com",
    likes: 2,
  };
  const response = await api.post("/api/blogs").send(newBlog).expect(201);

  const idBlog = response.body.id;

  await api.delete(`/api/blogs/${idBlog}`).expect(204);

  // const blogDelete = await api.get("/api/blogs");
  // const ids = blogDelete.body.map((blog) => blog.id);

  // expect(ids).not.toContain(blogDelete.id);
});

after(async () => {
  await mongoose.connection.close();
});
