import React from 'react';

export default function Spinier() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full animate-spin border-4 border-dashed border-blue-500 border-t-transparent"></div>
        <div
          className="w-14 h-14 rounded-full animate-spin absolute top-0 border-4 border-dashed border-purple-500 border-t-transparent opacity-70"
          style={{
            animationDirection: 'reverse',
            animationDuration: '1.5s',
          }}
        ></div>
      </div>
    </div>
  );
}
