import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ProfileImage } from './ProfileImage';
import Sidebar from './sidebar';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface NavLink {
  label: string;
  href: string;
}


const navLinks: NavLink[] = [];

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;


  const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

  return (
    <>
    <nav className="fixed w-full bg-white text-gray-900 md:px-20 lg:px-20 sm:px-10 py-2 flex justify-center border border-gray-200 shadow-sm">
      <div className="container lg:mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="lg:hidden md:hidden mr-2">
          <Bars3Icon className="h-8 w-8 text-gray-500" />
          </button>
          <Link href="/" className="flex items-center">
            <img
              src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              className="h-10"
              alt="Logo"
            />
          </Link>
        </div>
        <ul className="hidden space-x-4 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="hover:text-gray-600">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            {/* <Link href="/blogs" className="hover:text-gray-600">
              Blogs
            </Link> */}
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {!sessionData ? (
            <>
              <button
                className="hidden lg:block bg-white/10 border-2 border-none text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 transition"
                onClick={() => void signIn()}
              >
                Log In
              </button>
              <button
                className="bg-white/10 border-2 border-[#3b49df] text-md text-[#3b49df] px-4 py-1.5 rounded-md hover:bg-[#3b49df] hover:text-white transition"
                onClick={() => void signIn()}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <Link
                href="/create"
                className="hidden lg:block md:block bg-white/10 border-2 border-none text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 transition"
              >
                Create Post
              </Link>
              <button
                className="hidden lg:block md:block bg-white/10 border-2 border-none text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 transition"
                onClick={() => void signOut()}
              >
                Sign out
              </button>
              {user && (
                <Link href={`/profiles/${user.id}`}>
                  <ProfileImage src={user.image} className="h-8 w-8 rounded-full" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      
    </nav>
    {sidebarOpen && <Sidebar onClose={toggleSidebar} />}
    </>
  );
};

export default Navbar;



