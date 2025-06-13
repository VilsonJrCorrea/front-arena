import { POPULAR_POSTS_QUERY } from '../../../graphql/queries/PopularPostsQuery';
import { RECENT_POSTS_QUERY } from '../../../graphql/queries/RecentPostsQuery';
import { FeedTypeEnum } from '../enums/FeedTypeEnum';

export default {
  getQueryBasedOnFeedType(feedTypeEnum: FeedTypeEnum) {
    const feedTypeByQuery: Record<FeedTypeEnum, string> = {
      [FeedTypeEnum.POPULAR]: POPULAR_POSTS_QUERY,
      [FeedTypeEnum.RECENT]: RECENT_POSTS_QUERY,
    };
    return feedTypeByQuery[feedTypeEnum];
  },
};
