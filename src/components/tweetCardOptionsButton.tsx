import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Dialog, DialogPanel } from '@tremor/react';

type TweetCardOptionsButtonProps = {
  tweetId: string;
  authorId: string;
};

const TweetCardOptionsButton = ({ tweetId, authorId }: TweetCardOptionsButtonProps) => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession(); // Fetch session data
  const [error, setError] = useState<string | null>(null);
  // const [confirmOpen, setConfirmOpen] = useState(false);
  
  // Fetch tweet data to get the author's ID
  // const { data: tweet } = api.tweet.getTweetById.useQuery(tweetId);

  const deleteTweet = api.tweet.deleteTweet.useMutation({
    onSuccess: async () => {
      setError("Post Deleted Successfully!");
      await queryClient.invalidateQueries(); // Adjust the query key based on your setup
    },
    onError: (err) => {
      console.error("Failed to delete post:", err);
      setError("Failed to delete post.");
    },
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle state
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setError('Link copied to clipboard!');
    }, (_err) => {
      setError('Failed to copy link');
    });
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/blogPage/${tweetId}`;
    copyToClipboard(shareUrl);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      deleteTweet.mutate(tweetId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Ensure the "Delete" button only appears if the current user is the author of the tweet
  const canDelete = session?.user?.id === authorId;

  const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative ml-2">
      <button className="" onClick={toggleDropdown}>
        <EllipsisHorizontalIcon className="text-black h-6" />
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded" ref={dropdownRef}>
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleShareClick}
            >
              Share
            </li>
            {canDelete && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleDeleteClick}
                
              >
                Delete
              </li>
            )}
            {error && <p className="text-green-600 mx-2 text-sm">{error}</p>}
            <Dialog open={Boolean(error)} onClose={() => setError(null)}>
    <DialogPanel className="bg-red-100 text-red-600 p-4 rounded-md">
      {error}
    </DialogPanel>
  </Dialog>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TweetCardOptionsButton;
