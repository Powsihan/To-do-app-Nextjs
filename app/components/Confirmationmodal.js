import React from "react";

const ConfirmationModal = ({ show, message, onConfirm, onCancel,heading }) => {
  return (
    <>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="modal-content p-6">
            <h2 className="text-2xl font-semibold mb-4" style={{color:'darkred'}}>{heading}</h2>
            <hr className="mb-6"/>
              <p className="text-lg mb-6">{message}</p>
              <hr/>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-7 rounded mr-4"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
