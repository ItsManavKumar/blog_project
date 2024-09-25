import React from "react";
import {
  HomeIcon,
  FilmIcon,
  MicrophoneIcon,
  TagIcon,
  LightBulbIcon,
  ShoppingBagIcon,
  HeartIcon,
  TrophyIcon,
  SparklesIcon,
  BookOpenIcon,
  FaceSmileIcon,
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
  HandThumbUpIcon,
  EyeSlashIcon
} from "@heroicons/react/24/solid";

interface SidebarProps {
  onClose: () => void;
}
interface SidebarProps {
  onClose: () => void;
}

const ToggleSidebar: React.FC<SidebarProps> = ({onClose}) => {
  return (
    <nav
      id="sidebar"
      className="flex-col w-[330px] md:w-[300px] min-w-[330px] shadow-md rounded-md bg-white fixed lg:hidden md:hidden translate-transform duration-300" style={{zIndex: 1000}}
    >
      <ul className="space-y-2 text-lg p-4">
        <li><a
            href="#"
            className="w-full h-10 p-1 flex justify-between gap-2 hover:bg-blue-700/5 hover:underline rounded-md mb-6"
          >
            <span className="font-semibold text-xl">DEV Community</span>
            <XMarkIcon className="h-6 w-6 text-black" onClick={onClose} />
            
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 py-[16px] flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <HomeIcon className="h-6 w-6 text-yellow-500" />
            <span className="">Home</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <MicrophoneIcon className="h-6 w-6 text-black" />
            <span>Podcasts</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <FilmIcon className="h-6 w-6 text-gray-500" />
            <span>Videos</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <TagIcon className="h-6 w-6 text-green-500" />
            <span>Tags</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <LightBulbIcon className="h-6 w-6 text-yellow-400" />
            <span>DEV Help</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <ShoppingBagIcon className="h-6 w-6 text-purple-500" />
            <span>Forem Shop</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <HeartIcon className="h-6 w-6 text-red-600" />
            <span>Advertise on DEV</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <TrophyIcon className="h-6 w-6 text-yellow-700" />
            <span>DEV Challenges</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <SparklesIcon className="h-6 w-6 text-yellow-400" />
            <span>DEV Showcase</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <SparklesIcon className="h-6 w-6 text-blue-500" />
            <span>About</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500" />
            <span>Contact</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <BookOpenIcon className="h-4 w-4 text-white bg-black" />
            <span>Guides</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <FaceSmileIcon className="h-6 w-6 text-yellow-400 " />
            <span>Software comparisons</span>
          </a>
        </li>
        <li>
            <span className="text-black text-xl font-semibold px-4"> Other</span>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <HandThumbUpIcon className="h-6 w-6 text-yellow-400 " />
            <span>Code of Conduct</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <FaceSmileIcon className="h-6 w-6 text-purple-600 " />
            <span>Privacy Policy</span>
          </a>
        </li>
        <li>
          <a
            href="#home"
            className="w-full h-10 px-2 flex items-center gap-2 hover:bg-blue-700/5 hover:underline rounded-md"
          >
            <EyeSlashIcon className="h-6 w-6 text-black " />
            <span>Terms ofuse</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ToggleSidebar;
