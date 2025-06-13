import { FeedTypeEnum } from '../../enums/FeedTypeEnum';
import type { PostInterface } from '../../types/PostInterface';
import { FeedCard } from '../FeedCard';

export const FeedList = ({
  posts,
  feedTypeEnum,
  lastPostRef,
}: {
  posts: PostInterface[];
  feedTypeEnum: FeedTypeEnum;
  lastPostRef: (node: HTMLAnchorElement | null) => void;
}) => {
  return (
    <div key={feedTypeEnum}>
      {posts.map((post, idx) => {
        const isLast = idx === posts.length - 1;
        return (
          <FeedCard
            key={`${post.id}-${idx}-${feedTypeEnum}`}
            post={post}
            ref={isLast ? lastPostRef : null}
          />
        );
      })}
    </div>
  );
};
