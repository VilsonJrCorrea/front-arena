import type { PostInterface } from '../../types/PostInterface';

const CARD_HEIGHT = import.meta.env.VITE_CARD_HEIGHT;

export const FeedCard = ({
  post,
  ref,
}: {
  post: PostInterface;
  key: string;
  ref: React.Ref<HTMLAnchorElement>;
}) => {
  return (
    <a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="py-4 px-2 my-4 rounded-lg shadow hover:bg-[#f3f3f3] bg-white transition items-center flex flex-row justify-center "
      style={{
        height: `${CARD_HEIGHT}px`,
      }}
    >
      <div className="">
        <img
          src={post.thumbnail?.url || '/default-thumbnail.png'}
          alt={post.name}
          className="w-20 rounded-xl"
        />
      </div>
      <div className="flex flex-col items-start justify-center w-10/12 ml-3 text-left">
        <h2 className="text-xl text-gray-600">{post.name}</h2>
        <p className="text-xs text-gray-400 mt-1">
          {post.tagline.substring(0, 40)}
          {post.tagline.length > 40 ? '...' : ''}
        </p>
      </div>
      <div className="flex flex-col  mt-2 font-extrabold w-3/12 text-gray-800">
        <span className="text-xl">▲</span>
        <span className="text-xs">{post.votesCount} Votes</span>
      </div>
    </a>
  );
};
