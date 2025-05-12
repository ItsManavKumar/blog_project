import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { Bars3Icon } from "@heroicons/react/24/solid";
import ToggleSidebar from "./toggleSidebar";
import SearchBar from "./SearchBar";

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
        className="fixed flex w-full border border-gray-200 bg-white py-2 text-gray-900 shadow-sm"
        style={{ zIndex: 10 }}
      >
        <div className="flex w-full items-center justify-between px-[20px] lg:px-[90px]">
          <div className="flex items-center gap-[20px]">
            <button onClick={toggleSidebar} className="mr-2 lg:hidden">
              <Bars3Icon className="h-8 w-8 text-gray-500" />
            </button>
            <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Manav Kumar Logo" className="h-10 w-auto" />
            </Link>
            <div className=" ">
              <SearchBar />
            </div>
          </div>
          <ul className="hidden space-x-4 lg:flex">
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
                  className="hidden rounded bg-white/10 px-4 py-1.5 text-lg text-[#404040] transition hover:bg-purple-200 lg:block"
                  onClick={() => void signIn()}
                >
                  Log In
                </button>
                <button
                  className="rounded-md border border-[#3b49df] bg-white/10 px-4 py-1.5 text-lg text-[#3b49df] transition hover:bg-[#3b49df] hover:text-white hover:underline"
                  onClick={() => void signIn()}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/create"
                  className="rounded-md border border-[#3b49df] bg-white/10 px-4 py-1.5 text-lg text-[#3b49df] transition hover:bg-[#3b49df] hover:text-white hover:underline"
                >
                  Create Post
                </Link>
                <button
                  className="text-md hidden rounded bg-white/10 px-4 py-1 text-[#404040] transition hover:bg-purple-200 lg:block"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
                {user && (
                  <Link href={`/profiles/${user.id}`}>
                    <ProfileImage
                      src={user.image}
                      className="h-[45px] w-[45px] rounded-full"
                    />
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
