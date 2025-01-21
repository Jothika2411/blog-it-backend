import { userTypeDefs } from './userTypeDefs';
import { postTypeDefs } from './postTypeDefs';
import { mergeTypeDefs } from '@graphql-tools/merge';

export const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs]);
