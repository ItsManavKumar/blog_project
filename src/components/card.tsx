import React from 'react';
import Image from 'next/image';
import { UserIcon } from "@heroicons/react/24/solid";
import type { StaticImageData } from 'next/image';

interface CardProps {
  imageSrc: StaticImageData;
  username: string;
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, username, title, content }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w space-y-2">
      {/* Image Section */}
      <Image
        src={imageSrc}
        alt="Card Image"
        className="w-full h-[300px] object-cover"
        width={500}
        height={300}
      />

      {/* Content Section */}
      <ul className="p-4">
        <li>
          <a
            href="#"
            className="flex items-center gap-2"
          >
            <UserIcon className="h-6 w-6 text-yellow-500" />
            <span className='text-gray-700 text-base'>{username}</span>
          </a>
        </li>
      </ul>

      {/* Username Section */}
      <div className="p-4">
        <p className="text-gray-900 font-semibold text-xl">{title}</p>
        <p className="text-gray-700 text-md py-4">{content}</p>
      </div>
    </div>
  );
}

export default Card;
