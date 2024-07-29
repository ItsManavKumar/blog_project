import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [];

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex items-center justify-between bg-white px-20 py-2 text-black shadow-md">
      <Link href="#" className="flex items-center">
        <img
          src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          className="h-10"
          alt="Logo"
        ></img>
        </Link>
      <ul className="hidden space-x-4 lg:flex">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-gray-100">
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/blogs" className="hover:text-gray-100">
            Blogs
          </Link>
        </li>
      </ul>
    
      <div className="flex items-center space-x-4">
        {/* Log In Button */}
        {!sessionData && (
          <button
            className="hidden lg:block bg-white/10 border-2 border-none text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 hover:text-[#3b49df] transition"
            onClick={() => void signIn()}
          >
            Log In
          </button>
        )}
        {/* Create Account Button */}
        {!sessionData && (
          <button
            className="bg-white/10 border-[1px] border-[#3b49df] text-md text-[#3b49df] px-4 py-1.5 rounded-md hover:bg-[#3b49df] hover:text-white transition"
            onClick={() => void signIn()}
          >
            Create Account
          </button>
        )}
        {/* Create Post Button */}
        {sessionData && (
          <Link
            href="/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Create Post
          </Link>
        )}
        {/* Sign Out Button */}
        {sessionData && (
          <button
            className="bg-red-600 border-2 font-semibold border-red-600 text-sm text-white px-4 py-1 rounded hover:bg-red-700 transition"
            onClick={() => void signOut()}
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
