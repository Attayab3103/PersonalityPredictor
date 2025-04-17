import React from 'react';

export function Toaster({ position = 'bottom-right' }) {
  return (
    <div className={`fixed ${position} z-50 p-4`}>
      {/* Sonner toast notifications will be rendered here */}
    </div>
  );
}