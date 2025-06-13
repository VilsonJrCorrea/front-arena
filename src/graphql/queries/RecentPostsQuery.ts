export const RECENT_POSTS_QUERY = `
  query RecentPosts($first: Int!, $after: String) {
    posts(order: NEWEST, first: $first, after: $after) {
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
