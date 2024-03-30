import React, { useState ,useEffect} from "react";
import axios from "axios"; // Import Axios
import formHandler from "../utils/FormHandler";
import { validateTask } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = ({ isOpen, onClose }) => {
  const { handleChange, handleSubmit, values, errors } =
    formHandler(submitForm, validateTask);

  function submitForm() {
    axios
      .post("http://localhost:3000/api/tasks", values) 
      .then((response) => {
        console.log("Task added successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit} className="p-6">
              <div>
                <h3 className="text-3xl leading-6 font-semibold text-blue-900 mb-4 text-center">
                  Add Task
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="taskName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name || ""}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter task name"
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description || ""}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter description"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                >
                  Add Task
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
