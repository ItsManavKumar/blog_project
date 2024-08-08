import { HeartIcon, ChatBubbleBottomCenterIcon, BookmarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Icons = () => {
  return (
    <ul className="space-y-6 flex-row">
              <li>
                <a
                  href="#home"
                  className="flex h-10 w-full items-center gap-2 rounded-md px-2 py-[16px] hover:bg-blue-700/5 hover:underline"
                >
                  <HeartIcon className="h-6 w-6 " />
                  
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
                >
                  <ChatBubbleBottomCenterIcon className="h-6 w-6 text-black" />
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
                >
                  <BookmarkIcon className="h-6 w-6 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="flex h-10 w-full items-center gap-2 rounded-md px-2 hover:bg-blue-700/5 hover:underline"
                >
                  <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
                </a>
              </li>
            </ul>
  )
}

export default Icons