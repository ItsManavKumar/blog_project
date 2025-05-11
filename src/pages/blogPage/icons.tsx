import {
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import TweetCardOptionsButton from "../../components/tweetCardOptionsButton";


type IconsProps = {
  tweetId: string;
  authorId: string;
};

const Icons = ({ tweetId, authorId }: IconsProps) => {
  return (
    <ul className="space-y-6 flex-row">
      <li>
        <a
          href="#home"
          className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
        >
          <HeartIcon className="h-6 w-6 text-[#525252]" />
        </a>
      </li>
      <li>
        <a
          href="#home"
          className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#525252]" />
        </a>
      </li>
      <li>
        <a
          href="#home"
          className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
        >
          <BookmarkIcon className="h-6 w-6 text-[#525252]" />
        </a>
      </li>
      <li className="relative">
        {/* 🔥 Here's where the Share + Delete dropdown lives now */}
        <TweetCardOptionsButton tweetId={tweetId} authorId={authorId} />
      </li>
    </ul>
  );
};

export default Icons;
