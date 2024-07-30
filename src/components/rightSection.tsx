import React from "react";

const rightSection = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border-x border-t border-gray-200 ">
      <div className="border-b border-gray-200 bg-white p-4 text-lg font-semibold">
        <p className="text-md">Active discussions</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">Meme Monday</p>
        <p className="text-sm text-gray-500"> 15 comments</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">Top 20 JavaScript Tricks and Tips for Every Developer </p>
        <p className="text-sm text-gray-500"> 29 comments</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">Animating with TailwindCSS</p>
        <p className="text-sm text-gray-500"> 5 comments</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">Every React concept explained in 20 minutes</p>
        <p className="text-sm text-gray-500"> 18 comments</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">React vs. Next.js: The Ultimate Guide for Modern Web Development in 2024</p>
        <p className="text-sm text-gray-500"> 2 comments</p>
      </div>
      <div className="border-b border-gray-200 bg-white p-4 text-md ">
        <p className="text-md text-gray-700">Find Local Singles in your area call 911 for emergencies</p>
        <p className="text-sm text-gray-500"> 69 comments</p>
      </div>
    </div>
  );
};

export default rightSection;
