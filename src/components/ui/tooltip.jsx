import React from 'react';

export const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip = ({ children, content }) => {
  return (
    <div className="relative inline-block">
      <div className="peer">
        {children}
      </div>
      <div className="absolute hidden peer-hover:block bg-black text-white p-2 rounded text-sm">
        {content}
      </div>
    </div>
  );
};