import Post from '../models/Post';

export const getPostsByUser = async (userId: string) => {
  return await Post.find({ author: userId }).populate('author');
};

export const addNewPost = async (title: string, content: string, userId: string) => {
  const post = new Post({ title, content, author: userId });
  await post.save();
  return post.populate('author');
};
