import React, { useState, useEffect } from "react";
import ResumeForm from "./ResumeForm";
import "./App.css";
function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the breakpoint for md in Tailwind
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {isMobile ? (
          <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🖥️ Open in Desktop
            </h1>
            <p className="text-lg text-gray-600">
              For the best experience, please open this resume builder on a
              desktop or larger screen.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Mobile support coming soon!)
            </p>
          </div>
        ) : (
          <ResumeForm />
        )}
      </div>
    </>
  );
}

export default App;
