import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/solid";
import ToggleSidebar from "./toggleSidebar";
import SearchBar from "./SearchBar";
import { Button } from "./Button";
import { useRouter } from "next/router";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [];

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);

  const router = useRouter();
  const active = router.pathname === "/";

  return (
    <>
      <nav
        className="fixed w-full border border-gray-200 bg-white py-2 text-gray-900 shadow-sm"
        style={{ zIndex: 10 }}
      >
        <div className="flex w-full items-center justify-between px-[12px] sm:px-[20px] lg:px-[90px]">
          {/* LEFT */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSidebar}
              className="mr-1 shrink-0 lg:hidden"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-8 w-8 text-gray-500" />
            </button>

            {/* Home: only show on large screens */}
            <Link href="/" className="hidden lg:block shrink-0">
              <Button
                variant="ghost"
                small
                className={`px-3 py-2 text-base ${
                  active ? "border-blue-200 bg-blue-50 text-blue-700" : ""
                }`}
              >
                Home
              </Button>
            </Link>

            {/* Search: reserve space so it can't overlap right side */}
            <div className="min-w-0 flex-1 pr-2 sm:pr-3 lg:pr-2">
              <SearchBar />
            </div>
          </div>

          {/* DESKTOP LINKS (optional) */}
          <ul className="hidden space-x-4 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-gray-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-2">
            {!sessionData ? (
              <>
                <button
                  className="hidden rounded bg-white/10 px-4 py-1.5 text-lg text-[#404040] transition hover:bg-purple-200 lg:block"
                  onClick={() => void signIn()}
                >
                  Log In
                </button>
                <button
                  className="rounded-md border border-[#3b49df] bg-white/10 px-3 py-2 text-sm font-semibold text-[#3b49df] transition hover:bg-[#3b49df] hover:text-white hover:underline sm:px-4 sm:py-1.5 sm:text-lg"
                  onClick={() => void signIn()}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                {/* Create post: + on small, full text on sm+ */}
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center rounded-md border border-[#3b49df] bg-white/10 px-3 py-2 text-sm font-semibold text-[#3b49df] transition hover:bg-[#3b49df] hover:text-white hover:underline sm:px-4 sm:py-1.5 sm:text-lg"
                  aria-label="Create post"
                  title="Create post"
                >
                  <span className="inline sm:hidden">
                    <PlusIcon className="h-5 w-5" />
                  </span>
                  <span className="hidden sm:inline">Create Post</span>
                </Link>

                <button
                  className="hidden rounded bg-white/10 px-4 py-1 text-[#404040] transition hover:bg-purple-200 lg:block"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>

                {user && (
                  <Link href={`/profiles/${user.id}`} className="shrink-0">
                    <ProfileImage
                      src={user.image}
                      className="h-[40px] w-[40px] rounded-full sm:h-[45px] sm:w-[45px]"
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
