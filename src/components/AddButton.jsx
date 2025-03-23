import React from "react";
import { FiPlus } from "react-icons/fi";

const AddButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 rounded-md"
  >
    <FiPlus /> Add New
  </button>
);

export default AddButton;