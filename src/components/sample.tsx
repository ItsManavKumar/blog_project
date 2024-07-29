import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [];

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex items-center justify-between bg-white px-20 py-2 text-black shadow-md">
      <a href="#" className="flex items-center">
        <img
          src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          className="h-10"/>
      </a>
      <ul className="hidden space-x-4 lg:flex">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-gray-100">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        {/* Log In Button - Hidden on small screens */}
        <button
          className="hidden lg:block bg-white/10 border-2 border-none text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 hover:text-[#3b49df] transition"
          onClick={() => void signIn()}
        >
          Log In
        </button>
        {/* Create Account Button - Always visible */}
        <button
          className="bg-white/10 border-[1px] border-[#3b49df] text-md text-[#3b49df] px-4 py-1.5 rounded-md hover:bg-[#3b49df] hover:text-white transition"
          onClick={() => void signIn()} // Update the URL to your sign-up page
        >
          Create Account
        </button>
        {/* Sign Out Button - Only shown when user is signed in */}
        {sessionData && (
          <button
            className="rounded-full bg-red-600 border-2 font-semibold border-red-600 text-sm text-white px-4 py-1 rounded hover:bg-red-700 transition"
            onClick={() => void signOut()}
          >
            Sign out
          </button>
        )}
      </div>
      <button className="lg:hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12v6m16-6v6"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
