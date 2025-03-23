import React, { useState } from "react";

const LayoutControls = ({
  onLayoutChange,
  onAlignmentChange,
  onColumnWidthChange,
}) => {
  const [columns, setColumns] = useState(1);
  const [columnWidths, setColumnWidths] = useState([100]);
  const [alignment, setAlignment] = useState("left");

  const handleColumnsChange = (e) => {
    const newColumns = parseInt(e.target.value);
    setColumns(newColumns);
    setColumnWidths(Array(newColumns).fill(100 / newColumns));
    onLayoutChange(newColumns);
  };

  const handleColumnWidthChange = (index, value) => {
    const newWidths = [...columnWidths];
    newWidths[index] = parseInt(value);
    setColumnWidths(newWidths);
    onColumnWidthChange(newWidths);
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
    onAlignmentChange(e.target.value);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-xl bg-white">
      <h3 className="text-xl font-semibold mb-4">Layout Customization</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Columns</label>
          <select
            value={columns}
            onChange={handleColumnsChange}
            className="select select-bordered w-full"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
          </select>
        </div>
        {columns > 1 && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Column Widths
            </label>
            <div className="grid grid-cols-2 gap-4">
              {columnWidths.map((width, index) => (
                <div key={index}>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) =>
                      handleColumnWidthChange(index, e.target.value)
                    }
                    className="input input-bordered w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">
            Text Alignment
          </label>
          <select
            value={alignment}
            onChange={handleAlignmentChange}
            className="select select-bordered w-full"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LayoutControls;
