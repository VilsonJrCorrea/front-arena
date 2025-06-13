import { FeedTypeEnum } from '../../enums/FeedTypeEnum';

export const FeedHeader = ({
  onChangeFeedType,
  feedTypeEnum,
}: {
  onChangeFeedType: (type: FeedTypeEnum) => void;
  feedTypeEnum: FeedTypeEnum;
}) => {
  return (
    <nav className="flex flex-col justify-between items-center absolute top-0 left-0 right-0 pt-4 bg-white">
      <div className="flex flex-row w-full justify-around items-center">
        {Object.values(FeedTypeEnum).map((type) => (
          <div
            key={type}
            onClick={() => onChangeFeedType(type)}
            className={`py-1 transition w-full ${
              feedTypeEnum === type
                ? 'text-[#cf7e68] border border-[##cf7e68] border-b-2 border-t-0 border-l-0 border-r-0 font-bold'
                : 'text-gray-500  border border-gray-200 border-b-1 border-t-0 border-l-0 border-r-0'
            }`}
          >
            {type}
          </div>
        ))}
      </div>
    </nav>
  );
};
