import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

// external imports for the table searching in table
import GlobalFilter from "../../utils/GloableFilter";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import {
  deleteKitchenAction,
  getAllKitchenAction,
} from "../../actions/kitchen/kitchen";
import { DELETE_KITCHEN_RESET } from "../../actions/kitchen/typesKitchen";
import { clearError } from "../../actions/error";
import MetaData from "../../utils/MetaData";

const AllKitchen = () => {
  const dispatch = useDispatch();

  const [datas, setDatas] = useState([]);

  //selecting the kitchens from the redux
  const { allKitchens, error, loading } = useSelector(
    (state) => state.allKitchens
  );
  const { isdeleted, error: delError } = useSelector(
    (state) => state.deleteKitchen
  );

  //setting data
  useEffect(() => {
    allKitchens &&
      allKitchens.map((item) => {
        //set __v to id
        delete item.inventoryItemIndex;
        delete item.inventorySubItemIndex;
        delete item.ownerId;
        delete item.OwnerId;
        delete item.images;
        item.empIndex = item.contact;
        item.contact = item._id;
        delete item.__v;
        delete item._id;
        return item;
      });
    setDatas([...allKitchens]);
  }, [allKitchens]);

  //getting all the kitchens
  useEffect(() => {
    dispatch(getAllKitchenAction());
  }, [dispatch, isdeleted]);

  //delete the kitchen
  const deleteKitchen = (id) => {
    dispatch(deleteKitchenAction(id));
  };

  //deleted message show on the screen
  useEffect(() => {
    if (isdeleted) {
      notifySuccess("Kitchen deleted successfully.");
      dispatch({ type: DELETE_KITCHEN_RESET });
    }
  }, [isdeleted, dispatch]);

  //clearing error
  useEffect(() => {
    if (error || delError) {
      error && notifyError(error);
      delError && notifyError(delError);
      dispatch(clearError());
    }
  }, [error, delError, dispatch]);

  const data = useMemo(() => [...datas], [datas]);
  const columns = useMemo(
    () =>
      datas[0]
        ? Object.keys(datas[0]).map((key) => {
            // modifiying the fields
            if (key === "contact") {
              return {
                Header: "Action",
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    <Link
                      to={`/kitchen/employees/${value}`}
                      className="text-blue-700 mx-2"
                    >
                      Manage_employee
                    </Link>
                    <Link
                      to={`/kitchen/menu/${value}`}
                      className="text-blue-700 mx-2"
                    >
                      Menu
                    </Link>
                    <Link
                      to={`/kitchen/inventory/${value}`}
                      className="text-blue-700 mx-2"
                    >
                      Inventory
                    </Link>
                    <Link to={`/kitchen/update/${value}`}>
                      <button className="bg-green-600 rounded px-1 text-white text-sm mx-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 rounded px-1 text-white text-sm"
                      onClick={() => deleteKitchen(value)}
                    >
                      Delete
                    </button>
                  </>
                ),
              };
            }
            if (key === "empIndex") {
              return {
                Header: "Contact",
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    {value}
                  </>
                ),
              };
            }

            return { Header: key, accessor: key };
          })
        : [],
    [datas]
  );

  const initialState = { hiddenColumns: "" };

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
      <MetaData title={loading ? "Loading..." : "all kitchen"} />
      <div className="p-0 py-4 md:p-4 w-full bg-gray-100 min-h-[calc(100vh-56px)]">
        <div className="relative w-full mx-auto">
          <div className="w-full flex flex-col items-center justify-between">
            <h2 className="text-2xl text-[#00022e] mb-2">All Kitchens</h2>
            <div className="w-full flex items-center justify-between mt-2 px-4 md:px-0">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />
              <Link to="/kitchen/add">
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
                          className="py-2 px-3 min-w-[100%] text-left last:text-right text-base text-gray-800 font-semibold border-b border-b-gray-200 select-none capitalize"
                        >
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "???  "
                              : "???  "
                            : "???  ??? "}
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
                        className="border-b border-b-gray-200 cursor-default hover:bg-blue-100"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="py-2 px-3 min-w-[100%] text-left last:text-right text-base text-gray-600 font-normal"
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
                <div className="relative flex items-center justify-start flex-wrap w-full">
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

export default AllKitchen;
