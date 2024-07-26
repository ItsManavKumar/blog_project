interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Write", href: "/new" },
  { label: "Sign In", href: "/login" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-200">
      <a href="" className="text-xl font-bold">
        DEV Community
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
      <button className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 lg:hidden">
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
