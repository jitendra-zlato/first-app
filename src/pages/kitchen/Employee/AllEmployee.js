import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

// external imports for the table searching in table
import GlobalFilter from "../../../utils/GloableFilter";
import {
  deleteKitchenEmployee,
  getAllEmployeeAction,
} from "../../../actions/kitchen/employee";
import { setKitchenIdAction } from "../../../actions/kitchen/kitchenId";
import { clearError } from "../../../actions/error";
import { notifyError } from "../../../alert/taostifyalert";
import MetaData from "../../../utils/MetaData";
import { getKitchenAction } from "../../../actions/kitchen/kitchen";

const AllEmployee = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [datas, setDatas] = useState([]);

  const { allEmployee, error, loading } = useSelector(
    (state) => state.allEmployee
  );
  const { kitchen, error: kError } = useSelector((state) => state.kitchen);

  useEffect(() => {
    allEmployee &&
      allEmployee.map((item) => {
        delete item.shiftStartTime;
        delete item.shiftEndTime;
        delete item.role;
        //set __v to id
        item.__v = item.employeeId;
      });
    setDatas([...allEmployee]);
  }, [allEmployee]);

  //getting all the employee of the specific kitchen
  useEffect(() => {
    if (id) {
      dispatch(getAllEmployeeAction(id));
    }
  }, [dispatch, id]);

  //set kitchen id
  useEffect(() => {
    dispatch(setKitchenIdAction(id));
  }, [dispatch, id]);

  //get kitchen
  useEffect(() => {
    if (id) {
      dispatch(getKitchenAction(id));
    }
  }, [dispatch, id]);

  //clearing error
  useEffect(() => {
    if (error || kError) {
      error && notifyError(error);
      kError && notifyError(kError);
      dispatch(clearError());
    }
  }, [error, dispatch, kError]);

  //delete employee
  const deleteEmployee = (employeeId) => {
    dispatch(deleteKitchenEmployee(employeeId));
  };

  const data = useMemo(() => [...datas], [datas]);
  const columns = useMemo(
    () =>
      datas[0]
        ? Object.keys(datas[0]).map((key) => {
            if (key === "__v") {
              return {
                Header: "Action",
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    <Link
                      to={`/kitchen/employee/update/${value}`}
                      className="mr-2 text-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      className="hover:text-red-400"
                      onClick={() => deleteEmployee(value)}
                    >
                      Delete
                    </button>
                  </>
                ),
              };
            }

            if (key === "shifts") {
              return {
                Header: "Shift",
                accessor: key,
                Cell: ({ value }) => (
                  <>{value && value[0] && value[0].startTime}</>
                ),
              };
            }

            return { Header: key, accessor: key };
          })
        : [],
    [datas]
  );

  const initialState = {
    hiddenColumns: "_id extraWorks leaves permissions shifts kitchenId",
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
    state: { pageSize },
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
      <MetaData title={loading ? "Loading..." : "all employee"} />
      <div className="p-0 py-4 md:p-4 lg:p-8 w-full bg-gray-100 min-h-[calc(100vh-56px)]">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="w-full flex flex-col items-center justify-between">
            <h2 className="text-2xl text-[#00022e] mb-2">Employee - 
              {kitchen && kitchen.name}
            </h2>
            <div className="w-full flex items-center justify-between mt-2 px-4 md:px-0">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />
              <Link to="/kitchen/employee/add">
                <div className="p-2 text-xl bg-cyan-500 text-white rounded ml-4">
                  <AiOutlinePlus />
                </div>
              </Link>
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

export default AllEmployee;
