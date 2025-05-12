import { useRef, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";

// Debounce hook
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function SearchBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [isOpen, setIsOpen] = useState(false);

  const { data: results, isLoading } = api.tweet.search.useQuery(
    { query: debouncedQuery },
    {
      enabled: debouncedQuery.trim().length > 0 && isOpen,
    }
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const stripHtml = (html: string) => {
  //   return html.replace(/<[^>]+>/g, "");
  // };

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full sm:px-6 md:px-8 lg:px-0 max-w-3xl lg:w-[600px] md:w-[400px]">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setIsOpen(value.trim().length > 0);
        }}
        placeholder="Search Anything :)"
        className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm outline-[#3b49df]"
      />

      {isOpen && (
        <div className="absolute left-0 right-0 z-10  max-h-96 overflow-y-auto rounded bg-white shadow-lg">
          {isLoading && <p className="p-3">Searching...</p>}
          {!isLoading && results?.length === 0 && <p className="p-3">No results found.</p>}

          <ul>
            {results?.map((tweet) => (
              <li
                key={tweet.id}
                className=""
              >
                <Link
                  href={`/blogPage/${tweet.id}`}
                  className="block text-sm text-black rounded p-3 hover:bg-[#f5f5f5] outline-[#f5f5f5] border-[#f5f5f5]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{tweet.user.name}</span>
                    <span className="text-xs">
                      {new Date(tweet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-lg font-semibold">{tweet.header}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
