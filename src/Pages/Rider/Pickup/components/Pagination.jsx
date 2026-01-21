import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50/50">
      {/* Page info */}
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{' '}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </div>

      {/* Page buttons */}
      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Page info */}

        {/* Pagination Buttons with truncation */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {/* Always show page 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
              }`}
            >
              1
            </button>

            {/* Show page 2 if it exists */}
            {totalPages >= 2 && (
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                  currentPage === 2
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                }`}
              >
                2
              </button>
            )}

            {/* Dynamic page numbers with ellipsis */}
            {(() => {
              const pages = [];
              const showEllipsisStart = currentPage > 3;
              const showEllipsisEnd = currentPage < totalPages - 2;

              if (showEllipsisStart) {
                pages.push(
                  <span key="ellipsis-start" className="px-2 text-gray-400">
                    ...
                  </span>,
                );
              }

              // Show current page and nearby pages
              for (
                let i = Math.max(3, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
              ) {
                if (i > 2 && i < totalPages) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                        currentPage === i
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                      }`}
                    >
                      {i}
                    </button>,
                  );
                }
              }

              if (showEllipsisEnd) {
                pages.push(
                  <span key="ellipsis-end" className="px-2 text-gray-400">
                    ...
                  </span>,
                );
              }

              return pages;
            })()}

            {/* Show last page if there are more than 1 page */}
            {totalPages > 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
