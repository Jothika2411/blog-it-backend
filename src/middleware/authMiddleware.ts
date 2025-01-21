import { getUserFromToken } from '../utils/auth';

export const authMiddleware = (resolver: any) => {
  return (parent: any, args: any, context: any, info: any) => {
    const token = context.req.headers.authorization || '';
    const user = getUserFromToken(token);
    if (!user) throw new Error('Not authenticated');
    return resolver(parent, args, { ...context, user }, info);
  };
};
