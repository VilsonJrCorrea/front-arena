export const POPULAR_POSTS_QUERY = `
  query PopularPosts($first: Int!, $after: String) {
    posts(order: VOTES, first: $first, after: $after) {
      edges {
        node {
          id
          name
          tagline
          votesCount
          url
          thumbnail {
            url
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
