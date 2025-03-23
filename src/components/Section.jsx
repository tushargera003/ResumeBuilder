import React from "react";

const Section = ({ title, icon, children }) => (
  <div className="mb-8 p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    {children}
  </div>
);

export default Section;