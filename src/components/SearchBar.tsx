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

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setIsOpen(value.trim().length > 0);
        }}
        placeholder="Search Anything :)"
        className="w-full min-w-0 rounded border border-gray-300 px-3 py-2 shadow-sm outline-[#3b49df]"
      />

      {isOpen && (
        <div className="absolute left-0 right-0 z-20 mt-2 max-h-96 overflow-y-auto rounded bg-white shadow-lg">
          {isLoading && <p className="p-3">Searching...</p>}
          {!isLoading && results?.length === 0 && (
            <p className="p-3">No results found.</p>
          )}

          <ul>
            {results?.map((tweet) => (
              <li key={tweet.id}>
                <Link
                  href={`/blogPage/${tweet.id}`}
                  className="block rounded p-3 text-sm text-black hover:bg-[#f5f5f5]"
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
