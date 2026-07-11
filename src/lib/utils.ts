import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PaginationMetadata = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export function calculatePaginationMetadata(
  totalItems: number,
  currentPage = 1,
  itemsPerPage = 10
): PaginationMetadata {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage
  };
}

export function getBlogPaginationStartEnd(page: number): {
  start: number;
  end: number;
} {
  const start = (page - 1) * 10;
  const end = start + 10;
  return { start, end };
}
