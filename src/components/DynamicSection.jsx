import React from "react";
import { FiTrash2 } from "react-icons/fi";
import InputField from "./InputField";
import AddButton from "./AddButton";
import Section from "./Section";
const DynamicSection = ({
  title,
  icon,
  data,
  fields,
  onAdd,
  onRemove,
  onChange,
}) => (
  <Section title={title} icon={icon}>
    {data.map((item, index) => (
      <div key={index} className="mb-6 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">
            {title} #{index + 1}
          </h3>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <InputField
              key={field.key}
              label={field.label}
              value={item[field.key]}
              onChange={(v) => onChange(index, field.key, v)}
              type={field.type || "text"}
            />
          ))}
        </div>
      </div>
    ))}
    <AddButton onClick={onAdd} />
  </Section>
);

export default DynamicSection;
