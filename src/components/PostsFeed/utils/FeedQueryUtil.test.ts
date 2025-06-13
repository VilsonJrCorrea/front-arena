import { POPULAR_POSTS_QUERY } from '../../../graphql/queries/PopularPostsQuery';
import { RECENT_POSTS_QUERY } from '../../../graphql/queries/RecentPostsQuery';
import { FeedTypeEnum } from '../enums/FeedTypeEnum';
import FeedQueryUtil from './FeedQueryUtil';

describe('FeedQuery', () => {
  test('should return query for popular', () => {
    const result = FeedQueryUtil.getQueryBasedOnFeedType(FeedTypeEnum.POPULAR);
    expect(result).toBeDefined();
    expect(result).toBe(POPULAR_POSTS_QUERY);
  });
  test('should return query for latest', () => {
    const result = FeedQueryUtil.getQueryBasedOnFeedType(FeedTypeEnum.RECENT);
    expect(result).toBeDefined();
    expect(result).toBe(RECENT_POSTS_QUERY);
  });
});
