import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-12 h-12 border-4 border-library-accent/30 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-library-primary rounded-full animate-spin"></div>
        </div>
        {/* Book icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaBookOpen className="w-5 h-5 text-library-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;