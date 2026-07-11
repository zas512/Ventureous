"use client";
import { Input } from "@/components/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { StartupCard } from "./startup-card";
import type { StartupCardItem } from "./startup-card";

type Props = {
  startups: StartupCardItem[];
};

export function StartupSearch({ startups }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return startups;
    }

    return startups.filter((startup) => {
      const haystack = [
        startup.title,
        startup.category,
        startup.author?.name,
        startup.description
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, startups]);

  function handleChange(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="relative">
          <label className="sr-only" htmlFor="startup-search">
            Search startups
          </label>
          <Search
            aria-hidden="true"
            className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-muted-foreground"
          />
          <Input
            id="startup-search"
            className="h-12 pr-10 pl-10 text-base"
            placeholder="Search by title, category, or author..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
          {query && (
            <button
              aria-label="Clear search"
              className="-translate-y-1/2 absolute top-1/2 right-3 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => handleChange("")}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((startup) => (
            <li key={startup._id}>
              <StartupCard post={startup} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          {query ? `No results for "${query}"` : "No startups found"}
        </p>
      )}
    </div>
  );
}
