const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const mostLiked = (blogs) => {
  const likeCounts = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...likeCounts);
  return blogs.find((blog) => maxLikes === blog.likes);
};

const mostBlogs = (blogs) => {
  const blogCounts = {};
  let authorWithMostBlogs = "";

  blogs.forEach((blog) => {
    const { author } = blog;

    const blogCount = blogCounts[author];
    const newBlogCount = blogCount !== undefined ? blogCount + 1 : 1;

    blogCounts[author] = newBlogCount;

    //fallback used only in first iteration to initialize author with more blogs
    const maxBlogCount = blogCounts[authorWithMostBlogs] ?? 0;

    if (newBlogCount >= maxBlogCount) {
      authorWithMostBlogs = author;
    }
  });

  return {
    author: authorWithMostBlogs,
    blogs: blogCounts[authorWithMostBlogs],
  };
};

const mostLikedPerson = (blogs) => {
  const likeCounts = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...likeCounts);
  const likedPerson = blogs.find((blog) => maxLikes === blog.likes);
  return {
    author: likedPerson.author,
    likes: likedPerson.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  mostLikedPerson,
};
