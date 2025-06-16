import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function Pagination({ total, currentPage, onChange }) {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (page) => {
    setPage(page);
    onChange(page);
  };

  return (
    <PaginationComponent>
      <PaginationItem>
        <PaginationLink
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <PaginationPrevious />
        </PaginationLink>
      </PaginationItem>
      <PaginationContent>
        <PaginationEllipsis />
        {[...Array(total)].map((_, i) => (
          <PaginationItem key={i} className="flex items-center border-2 border-blue-200 rounded-lg">
            <PaginationLink
              active={page === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationItem>
        <PaginationLink
          disabled={page === total}
          onClick={() => handlePageChange(page + 1)}
        >
          <PaginationNext />
        </PaginationLink>
      </PaginationItem>
    </PaginationComponent>
  );
}