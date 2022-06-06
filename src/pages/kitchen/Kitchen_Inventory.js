import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import MetaData from "../../utils/MetaData";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

import { clearError } from "../../actions/error";

// external imports for the table searching in table
import GlobalFilter from "../../utils/GloableFilter";

import { getOwnerInventoryAction } from "../../actions/kitchen/owner_inventory";
import { setKitchenIdAction } from "../../actions/kitchen/kitchenId";
import { notifyError } from "../../alert/taostifyalert";
import { getKitchenAction } from "../../actions/kitchen/kitchen";

const KitchenInventory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [datas, setDatas] = useState([]);

  const { inventory, error, loading } = useSelector((state) => state.inventory);
  const { kitchen, error: kitchenError } = useSelector(
    (state) => state.kitchen
  );

  useEffect(() => {
    console.log(inventory.items);
    if (inventory.items && inventory.items.length > 0) {
      inventory.items.map((i) => {
        delete i.images;
        delete i.subInventory;
        return i;
      });
    }
    if (inventory.items) {
      setDatas([...inventory.items]);
    }
  }, [inventory]);

  //set kitchenid
  useEffect(() => {
    if (id) {
      dispatch(setKitchenIdAction(id));
    }
  }, [id, dispatch]);

  //get all the inventory by kitchen id
  useEffect(() => {
    dispatch(getOwnerInventoryAction(id));
  }, [dispatch, id]);

  // get kitchen by id
  useEffect(() => {
    if (id) {
      dispatch(getKitchenAction(id));
    }
  }, [id, dispatch]);

  //clear all the error
  useEffect(() => {
    if (error || kitchenError) {
      error && notifyError(error);
      kitchenError && notifyError(kitchenError);
      dispatch(clearError());
    }
  }, [error, dispatch, kitchenError]);

  const data = useMemo(() => [...datas], [datas]);
  const columns = useMemo(
    () =>
      datas[0]
        ? Object.keys(datas[0]).map((key) => {
            if (key === "id") {
              return {
                Header: "Action",
                accessor: key,
                Cell: () => (
                  <>
                    <Link
                      to={`/kitchen/inventory/update`}
                      className="text-blue-700 mx-1"
                    >
                      Update
                    </Link>
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
      <MetaData title={loading ? "Loading..." : "kitchen inventory"} />
      <div className="p-0 py-4 md:p-4 lg:p-8 w-full bg-gray-100 min-h-[calc(100vh-56px)]">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="w-full flex flex-col items-center justify-between">
            <h2 className="text-2xl text-[#00022e] mb-2">
              {"Inventory - "}
              {kitchen && kitchen.name}
            </h2>
            <div className="w-full flex items-center justify-between mt-2 px-4 md:px-0">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />
              <Link to="/kitchen/inventory/add">
                <div className="p-2 text-xl bg-cyan-500 text-white rounded ml-4">
                  <AiOutlinePlus />
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full relative overflow-x-hidden mt-4 border-t border-b border-gray-200 md:border">
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
                          className="py-2 px-3 min-w-[100%] text-right text-base text-gray-900 font-semibold border-b border-b-gray-200 select-none capitalize"
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
                              className="py-2 px-3 min-w-[100%] text-right text-base text-gray-900 font-normal"
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

export default KitchenInventory;
