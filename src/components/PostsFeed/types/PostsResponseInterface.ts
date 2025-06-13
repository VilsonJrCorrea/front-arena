import type { PostInterface } from "./PostInterface";

export interface PostsResponseInterface {
  edges: { node: PostInterface; cursor: string }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}