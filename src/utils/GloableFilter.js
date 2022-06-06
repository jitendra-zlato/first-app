import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GloableFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div className="relative flex items-center w-72 min-w-[150px]">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records`}
        className="border rounded h-full w-full p-2 text-base"
      />
    </div>
  );
};

export default GloableFilter;
