/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🧪 Responsive Layout Test
      </h1>

      {/* Grid Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-300 p-6 rounded text-center">Box 1</div>
        <div className="bg-green-300 p-6 rounded text-center">Box 2</div>
        <div className="bg-red-300 p-6 rounded text-center">Box 3</div>
        <div className="bg-yellow-300 p-6 rounded text-center">Box 4</div>
      </div>

      {/* Responsive Image */}
      <div className="my-6">
      <img
  src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80"
  className="w-full sm:w-2/3 md:w-1/2 mx-auto rounded shadow"
  alt="Nature"
/>

      </div>

      {/* Responsive Text */}
      <p className="text-sm sm:text-base md:text-lg text-center">
        This text size changes as the screen gets bigger.
      </p>

      {/* Show/hide sections */}
      <div className="mt-4 text-center">
        <p className="sm:hidden text-red-600 font-semibold">
          👋 Only visible on small screens
        </p>
        <p className="hidden sm:block text-green-700 font-semibold">
          💻 Visible on medium+ screens
        </p>
      </div>
    

    </div>
  );
}
