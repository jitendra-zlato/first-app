import React from 'react'

const PaginationButton = () => {
  return (
    <div>
      {pageOptions.length > 1 ? (
        <div className="relative flex items-center justify-start flex-wrap w-full">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer"
          >
            55
            {"<<"}
          </button>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer"
          >
            {"1"}
          </button>
          <button className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer">
            <BsThreeDots />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer"
          >
            {pageCount - 1}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer"
          >
            {">>"}
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="border border-gray-200 rounded overflow-hidden m-4">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-1 text-base"
        >
          {[5, 10, 25, 50, 100].map((element) => (
            <option
              key={element}
              value={element}
              className="bg-white p-1 relative text-sm"
            >
              show {element}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PaginationButton