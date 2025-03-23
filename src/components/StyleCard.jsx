import React from "react";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
const StyleCard = ({ name, styleClass, isSelected, onSelect }) => (
  <motion.div
    onClick={onSelect}
    role="button"
    className={`relative p-2 rounded-lg cursor-pointer transition-all
      ${isSelected ? "ring-2 ring-blue-500" : "ring-1 ring-gray-200"}
      hover:ring-blue-300 hover:shadow-sm`}
  >
    {/* Preview Miniature */}
    <div className={`${styleClass} h-20 rounded-md overflow-hidden relative`}>
      {/* Sample Preview Content */}
      <div className="absolute inset-0 p-1">
        <div className="h-2 w-1/3 bg-blue-200 rounded mb-1"></div>
        <div className="h-1 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-1 w-2/3 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>

    {/* Style Name */}
    <div className="mt-2 text-center">
      <span
        className={`text-xs font-medium ${
          isSelected ? "text-blue-600" : "text-gray-600"
        }`}
      >
        {name}
      </span>
    </div>

    {/* Selection Checkmark */}
    {isSelected && (
      <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
        <FiCheck className="text-white w-3 h-3" />
      </div>
    )}
  </motion.div>
);

export default StyleCard;
