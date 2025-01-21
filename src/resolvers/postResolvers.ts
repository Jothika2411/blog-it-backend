import { getPostsByUser, addNewPost } from '../services/postService';
import { authMiddleware } from '../middleware/authMiddleware';
import { PostInput, PostResolverContext } from './types';

export const postResolvers = {
  Query: {
    posts: authMiddleware(async (parent: unknown, args: unknown, context: PostResolverContext, info: unknown) => {
      return await getPostsByUser(context.user.id);
    }),
  },
  Mutation: {
    addPost: authMiddleware(async (parent: unknown, args: { input: PostInput }, context: PostResolverContext, info: unknown) => {
      const { title, content } = args.input;
      return await addNewPost(title, content, context.user.id);
    }),
  },
};
