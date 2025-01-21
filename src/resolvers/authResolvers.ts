import { signUpUser, signInUser } from '../services/authService';
import { SignUpInput, SignInInput, AuthResolverContext } from './types';

export const authResolvers = {
  Mutation: {
    signUp: async (parent: unknown, args: { input: SignUpInput }, context: AuthResolverContext, info: unknown) => {
      const { username, email, password } = args.input;
      return await signUpUser(username, email, password);
    },
    signIn: async (parent: unknown, args: { input: SignInInput }, context: AuthResolverContext, info: unknown) => {
      const { email, password } = args.input;
      return await signInUser(email, password);
    },
  },
};
