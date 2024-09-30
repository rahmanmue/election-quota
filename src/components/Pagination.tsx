import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Pagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationTable = ({
  currentPage,
  totalPages,
  onPageChange,
}: Pagination) => {
  const maxVisiblePages = 3;

  const getPagesNumber = () => {
    let starPage, endPage;

    // Validasi bahwa totalPages adalah positif dan tidak lebih kecil dari 1
    if (totalPages < 1) {
      return [];
    }

    if (totalPages <= maxVisiblePages) {
      starPage = 1;
      endPage = totalPages;
    } else {
      const maxBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      // Validasi currentPage sebelum digunakan dalam perhitungan
      if (currentPage <= maxBeforeCurrent) {
        starPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxAfterCurrent >= totalPages) {
        starPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        starPage = currentPage - maxBeforeCurrent;
        endPage = currentPage + maxAfterCurrent;
      }
    }

    // Memastikan starPage dan endPage tidak negatif
    starPage = Math.max(starPage, 1);
    endPage = Math.min(endPage, totalPages);

    return [...Array(endPage - starPage + 1).keys()].map((i) => starPage + i);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="flex justify-end mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 && handlePageChange(Number(currentPage) - 1)
            }
          />
        </PaginationItem>

        {getPagesNumber().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={currentPage == page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages &&
              handlePageChange(Number(currentPage) + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
