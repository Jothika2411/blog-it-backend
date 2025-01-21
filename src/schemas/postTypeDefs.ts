import { gql } from 'graphql-tag';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    posts: [Post!]!
  }

  input AddPostInput {
    title: String!
    content: String!
  }

  type Mutation {
    addPost(input: AddPostInput!): Post!
  }
`;
