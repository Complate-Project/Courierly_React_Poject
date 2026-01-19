import React, { useState, useRef, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { saveAs } from 'file-saver';

const SaveData = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('JSON');
  const dropdownRef = useRef(null);

  const formats = ['JSON', 'CSV', 'TXT'];

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = format => {
    if (!data || data.length === 0) return;

    if (format === 'JSON') {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      saveAs(blob, 'pickup_data.json');
    }

    if (format === 'CSV') {
      const headers = Object.keys(data[0]);
      const csvRows = [];
      csvRows.push(headers.join(','));
      data.forEach(item => {
        const values = headers.map(
          header => `"${String(item[header] ?? '').replace(/"/g, '""')}"`,
        );
        csvRows.push(values.join(','));
      });
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'pickup_data.csv');
    }

    if (format === 'TXT') {
      const txtString = data.map(item => JSON.stringify(item)).join('\n');
      const blob = new Blob([txtString], { type: 'text/plain;charset=utf-8;' });
      saveAs(blob, 'pickup_data.txt');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300"
      >
        <FiDownload size={16} className="text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {formats.map(f => (
            <button
              key={f}
              onClick={() => {
                setStatus(f);
                handleDownload(f);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                ${status === f ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}
              `}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveData;
