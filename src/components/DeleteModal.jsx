import React from 'react';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-60 flex items-center  justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-xl mb-4">Are you sure you want to delete this item?</h2>
        <div className="flex justify-center">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
