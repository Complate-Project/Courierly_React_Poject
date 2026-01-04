import React from 'react';

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
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
