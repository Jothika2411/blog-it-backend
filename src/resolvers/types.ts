export interface PostInput {
  title: string;
  content: string;
}

export interface PostResolverContext {
  user: { id: string };
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthResolverContext {
  user: { id: string };
}
