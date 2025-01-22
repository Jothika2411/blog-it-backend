import { getUserFromToken } from '../utils/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTokenFromRequest = (req: any) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  } catch (error) {
    throw new Error('Not authenticated');
  }
};

export const authMiddleware = (resolver: any) => {
  return (parent: any, args: any, context: any, info: any) => {
    const token = getTokenFromRequest(context.req);
    const user = getUserFromToken(token);
    if (!user) throw new Error('Not authenticated');
    return resolver(parent, args, { ...context, user }, info);
  };
};
