const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNeighbours = 2; // Number of pages to show around the current page
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page range
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate the pagination range
  const paginationRange = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ["LEFT", ...extraPages, ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, "RIGHT"];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = ["LEFT", ...pages, "RIGHT"];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
 
  return (
    <div className="p-4 sm:p-6 xl:p-7.5 container mx-auto">
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          <li>
            <a
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "disabled bg-primary text-white"
                  : "bg-[#EDEFF1]"
              }  cursor-pointer flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-black hover:bg-primary hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Previous
            </a>
          </li>
          {paginationRange().map((page, index) =>
            page === "LEFT" ? (
              <li key={index}>
                <a
                  onClick={() =>
                    onPageChange(currentPage - pageNeighbours * 2 - 1)
                  }
                  className="cursor-pointer flex items-center justify-center rounded px-3 py-1.5 font-medium hover:bg-primary hover:text-white"
                >
                  ...
                </a>
              </li>
            ) : page === "RIGHT" ? (
              <li key={index}>
                <a
                  onClick={() =>
                    onPageChange(currentPage + pageNeighbours * 2 + 1)
                  }
                  className="cursor-pointer flex items-center justify-center rounded px-3 py-1.5 font-medium hover:bg-primary hover:text-white"
                >
                  ...
                </a>
              </li>
            ) : (
              <li key={index}>
                <a
                  onClick={() => onPageChange(page)}
                  className={`${
                    page === currentPage ? "bg-primary text-white" : ""
                  }  cursor-pointer flex items-center justify-center rounded px-3 py-1.5 font-medium hover:bg-primary hover:text-white`}
                >
                  {page}
                </a>
              </li>
            )
          )}
          <li>
            <a
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "disabled bg-primary text-white"
                  : "bg-[#EDEFF1]"
              }  cursor-pointer  flex items-center justify-center rounded  px-3 py-1.5 text-xs font-medium text-black hover:bg-primary hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
