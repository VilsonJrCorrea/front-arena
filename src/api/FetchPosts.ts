import type { PostsResponseInterface } from '../components/PostsFeed/types/PostsResponseInterface';

export default {
  async run(
    query: string,
    first: number,
    after: string | null = null
  ): Promise<PostsResponseInterface | null> {
    const variables = { first: first, after: after };
    const response = await fetch(import.meta.env.VITE_PRODUCT_HUNT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_PRODUCT_HUNT_TOKEN}`,
      },
      body: JSON.stringify({ query: query, variables: variables }),
    });
    const { data } = await response.json();
    if (response.status !== 200) {
      console.error('Error fetching posts:', data);
      return null;
    }
    return data?.posts || null;
  },
};
