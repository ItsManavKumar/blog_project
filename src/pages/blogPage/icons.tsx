import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftRightIcon, BookmarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const Icons = ({ tweetId }: { tweetId: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      alert('Failed to copy link');
    });
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/blogPage/${tweetId}`;
    copyToClipboard(shareUrl);
  };

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
        <button
          onClick={toggleDropdown}
          className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5"
        >
          <EllipsisHorizontalIcon className="h-6 w-6 text-[#525252]" />
        </button>
        {isDropdownOpen && (
          <div className="absolute  mt-2 w-48 bg-white border border-gray-300 rounded">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleShareClick}
              >
                Share
              </li>
            </ul>
          </div>
        )}
      </li>
    </ul>
  );
};

export default Icons;
