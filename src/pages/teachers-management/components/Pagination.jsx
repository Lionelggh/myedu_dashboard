import React from 'react';

import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [];

  return (
    <div className="bg-surface border-t border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Items per page */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-text-secondary">
            of {totalItems.toLocaleString()} teachers
          </span>
        </div>

        {/* Page info and navigation */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">
            Showing {startItem.toLocaleString()} to {endItem.toLocaleString()} of {totalItems.toLocaleString()} results
          </span>

          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              {/* Previous button */}
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                iconSize={16}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-2"
              />

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {visiblePages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-3 py-1 text-text-muted">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className="px-3 py-1 min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next button */}
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                iconSize={16}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;