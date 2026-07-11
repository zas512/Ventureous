import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";
import { Blog } from "@/types";

export function useBlogSearch(blogs: Blog[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 400);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const hasQuery = normalizedQuery.length > 0;

  const results = useMemo(() => {
    if (!hasQuery) {
      return [];
    }

    return blogs.filter((blog) => {
      const haystack = [blog.title, blog.description, blog.slug]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [blogs, hasQuery, normalizedQuery]);

  return {
    searchQuery,
    setSearchQuery,
    results,
    isSearching: false,
    error: null,
    hasQuery
  };
}
