import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ProfileImage } from './ProfileImage';
import { Bars3Icon } from '@heroicons/react/24/solid';
import ToggleSidebar from './toggleSidebar';

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
    <nav
  className="fixed w-full text-gray-900 py-2 flex border border-gray-200 shadow-sm bg-white"
  style={{ zIndex: 10 }}
>
  <div className="w-full px-[80px] flex items-center justify-between">
    <div className="flex items-center">
      <button onClick={toggleSidebar} className="lg:hidden mr-2">
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
    <ul className="hidden lg:flex space-x-4">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="hover:text-gray-600">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
    <div className="flex items-center space-x-2">
      {!sessionData ? (
        <>
          <button
            className="hidden lg:block bg-white/10 text-base text-[#404040] px-4 py-1 rounded hover:bg-purple-200 transition"
            onClick={() => void signIn()}
          >
            Log In
          </button>
          <button
            className="bg-white/10 border hover:underline border-[#3b49df] text-lg text-[#3b49df] px-4 py-1.5 rounded-md hover:bg-[#3b49df] hover:text-white transition"
            onClick={() => void signIn()}
          >
            Create account
          </button>
        </>
      ) : (
        <>
          <Link
            href="/create"
            className="bg-white/10 hover:underline border border-[#3b49df] text-lg text-[#3b49df] px-4 py-1.5 rounded-md hover:bg-[#3b49df] hover:text-white transition"
          >
            Create Post
          </Link>
          <button
            className="hidden lg:block bg-white/10 text-md text-[#404040] px-4 py-1 rounded hover:bg-purple-200 transition"
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
{sidebarOpen && <ToggleSidebar onClose={toggleSidebar} />}

    </>
  );
};

export default Navbar;



