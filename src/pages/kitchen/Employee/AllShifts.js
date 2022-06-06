import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

import GlobalFilter from "../../../utils/GloableFilter";

import { clearError } from "../../../actions/error";
import { getEmployeeAllShift } from "../../../actions/kitchen/employee-shift";
import MetaData from "../../../utils/MetaData";

const AllShifts = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);

  const { shifts, error } = useSelector((state) => state.employeeShifts);
  const { employee } = useSelector((state) => state.kEmployeeAuth);

  useEffect(() => {
    if (shifts.length > 0) {
      setDatas([...shifts]);
    }
  }, [shifts]);

  //all shifts
  useEffect(() => {
    dispatch(getEmployeeAllShift());
  }, [dispatch]);

  //errors
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const data = useMemo(() => [...datas], [datas]);
  const columns = useMemo(
    () =>
      datas[0]
        ? Object.keys(datas[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [datas]
  );

  const initialState = {
    hiddenColumns: "_id",
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    { columns, data, initialState },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
    <MetaData title={"all shifts"}/>
      <div className="p-0 py-4 md:p-4 lg:p-8 w-full bg-gray-100 min-h-[calc(100vh-56px)]">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="w-full flex flex-col items-center justify-between">
            <h2 className="text-2xl text-[#00022e] mb-2">
              Employee ID- {employee && employee.employeeId}{" "}
            </h2>
            <h2 className="text-2xl text-[#00022e] mb-2">All Shifts</h2>
            <div className="w-full flex items-center justify-between mt-2 px-4 md:px-0">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />
            </div>
          </div>

          <div className="w-full relative overflow-x-auto mt-4 border-t border-b border-gray-200 md:border">
            {datas && (
              <table
                {...getTableProps()}
                className="border-collapse overflow-x-auto gap-4 w-full bg-white"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="py-2 px-3 min-w-[100%] text-right text-base text-gray-800 font-semibold border-b border-b-gray-200 select-none capitalize"
                        >
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "▼  "
                              : "▲  "
                            : "▲  ▼ "}
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="border-b border-b-gray-200 cursor-default"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="py-2 px-3 min-w-[100%] text-right text-base text-gray-600 font-normal"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="relative flex items-center justify-between flex-wrap bg-white border-t-0 w-full">
              {pageOptions.length > 1 ? (
                <div className="relative flex items-center justify-start flex-wrap">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="h-8 w-8 rounded-full my-0 mx-1 flex items-center justify-center bg-cyan-600 text-white cursor-pointer"
                  >
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AllShifts;
