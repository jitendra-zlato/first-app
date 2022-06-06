import React, { useState, useEffect, useMemo } from "react";

import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { clearError } from "../../../../actions/error";
import { deleteEmployeeLeaveAction } from "../../../../actions/kitchen/employee-profile";
import { DELETE_LEAVE_OF_EMP_RESET } from "../../../../actions/kitchen/typesEmployee";
import { notifyError, notifySuccess } from "../../../../alert/taostifyalert";

// external imports for the table searching in table
import GlobalFilter from "../../../../utils/GloableFilter";

const EmployeeLeave = ({ leaves, kitchenId, employeeId }) => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);

  //selection datas from redux store
  const { isdeleted, error } = useSelector((state) => state.deleteLeave);

  useEffect(() => {
    leaves && setDatas([...leaves]);
  }, [leaves]);

  //delete leave
  const deleteLeave = (kitchenId, employeeId, leaveId) => {
    dispatch(deleteEmployeeLeaveAction(kitchenId, employeeId, leaveId));
  };

  useEffect(() => {
    if (isdeleted) {
      notifySuccess("leave deleted.");
      dispatch({ type: DELETE_LEAVE_OF_EMP_RESET });
    }
  }, [isdeleted, dispatch]);

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const data = useMemo(() => [...datas], [datas]);
  const columns = useMemo(
    () =>
      datas[0]
        ? Object.keys(datas[0]).map((key) => {
            if (key === "_id") {
              return {
                Header: "Action",
                accessor: key,
                Cell: ({ value }) => (
                  <button
                    className="bg-red-600 rounded px-1 text-white"
                    onClick={() => deleteLeave(kitchenId, employeeId, value)}
                  >
                    Delete
                  </button>
                ),
              };
            }

            return { Header: key, accessor: key };
          })
        : [],
    [datas]
  );

  const initialState = {
    hiddenColumns: "",
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
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="allbooking-table-container">
        <div className="global-react-talbe-view">
          <div className="global-react-table-header">
            <h2>Employee leaves</h2>
            <div className="adminViewHeaderLinks">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />
            </div>
          </div>

          <div className="global-table-container">
            {datas && (
              <table {...getTableProps()} className="global-react-table">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
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
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
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
            <div className="global-react-table-footer">
              {pageOptions.length > 1 ? (
                <div className="global-react-table-pagination">
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn-pagination"
                  >
                    {"prev"}
                  </button>
                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="btn-pagination"
                  >
                    {"1"}
                  </button>
                  <button className="btn-pagination">
                    <BsThreeDots />
                  </button>
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="btn-pagination"
                  >
                    {pageCount - 1}
                  </button>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn-pagination"
                  >
                    {"next"}
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <div className="how-Much-show-On-Page">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 25, 50, 100].map((element) => (
                    <option key={element} value={element}>
                      show {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeave;
