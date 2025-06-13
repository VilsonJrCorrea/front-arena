import { useState, useEffect, useRef, useCallback } from 'react';
import type { PostInterface } from './types/PostInterface';
import { FeedTypeEnum } from './enums/FeedTypeEnum';
import FeedQueryUtil from './utils/FeedQueryUtil';
import FetchPosts from '../../api/FetchPosts';
import { FeedHeader } from './components/FeedHeader';
import { FeedList } from './components/FeedList';

const CARD_HEIGHT = import.meta.env.VITE_CARD_HEIGHT;

/**
 * Finish components for posts feed
 * Implement all UI
 */
export function PostsFeed() {
  const [feedType, setFeedType] = useState<FeedTypeEnum>(FeedTypeEnum.POPULAR);
  const [posts, setPosts] = useState([] as PostInterface[]);
  const [cursor, setCursor] = useState(null as string | null);
  const [hasNext, setHasNext] = useState(true as boolean);
  const [fetchSize, setFetchSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    bindEventListeners();
    const initialFetchSize = getFetchSizeBasedOnDocumentHeight();
    setFetchSize(initialFetchSize);
    fetchPosts(feedType, null, initialFetchSize);
  }, []);

  function bindEventListeners() {
    window.addEventListener('resize', () => {
      const fetchSize = getFetchSizeBasedOnDocumentHeight();
      setFetchSize(fetchSize);
    });
  }

  function getFetchSizeBasedOnDocumentHeight() {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const visibleCards = Math.ceil(windowHeight / CARD_HEIGHT);
    const totalCards = Math.ceil(documentHeight / CARD_HEIGHT);
    const newFetchSize = Math.min(visibleCards, totalCards);
    return newFetchSize;
  }

  async function fetchPosts(
    currentFeedType: FeedTypeEnum = feedType,
    currentCursor: string | null = cursor,
    currentFetchSize: number = fetchSize
  ) {
    if (!hasNext || loading) {
      return;
    }
    setLoading(true);
    const query = FeedQueryUtil.getQueryBasedOnFeedType(currentFeedType);
    const result = await FetchPosts.run(query, currentFetchSize, currentCursor);
    if (!result) {
      console.error('Failed to fetch posts');
      setLoading(false);
      return;
    }
    const newEdges = result.edges.map((edge) => edge.node);
    const allEdges = [...posts, ...newEdges];
    setPosts(allEdges);
    setCursor(result.pageInfo.endCursor);
    setHasNext(result.pageInfo.hasNextPage);
    setLoading(false);
  }

  const lastPostRef = useCallback(
    (node: any) => {
      if (loading) {
        return;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchPosts();
        }
      });
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasNext, fetchPosts, feedType]
  );

  function onChangeFeedType(type: FeedTypeEnum) {
    if (feedType === type) {
      return;
    }
    setFeedType(type);
    setPosts([]);
    setCursor(null);
    setHasNext(true);
    fetchPosts(type, null, fetchSize);
  }

  return (
    <div className="py-4  justify-around">
      <FeedHeader onChangeFeedType={onChangeFeedType} feedTypeEnum={feedType} />

      <FeedList
        posts={posts}
        feedTypeEnum={feedType}
        lastPostRef={lastPostRef}
      />

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {!hasNext && <p className="text-center text-gray-400">No more posts</p>}
    </div>
  );
}
