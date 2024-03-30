import React, { useState, useEffect } from "react";
import axios from "axios";
import formHandler from "../utils/FormHandler";
import { validateTask } from "../utils/validation";
import toast, { Toaster } from "react-hot-toast";
import { isEmpty } from "underscore";

import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TaskForm = (props) => {
  const { handleChange, handleSubmit, values, errors, initForm } = formHandler(
    stateTask,
    validateTask
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  function stateTask() {
    setIsSubmit(true);
  }
  useEffect(() => {
    if (
      ["View", "State", "Edit"].includes(props.type) &&
      !isEmpty(props.selectedTask)
    ) {
      initForm(props.selectedTask);
    } else {
      initForm({});
    }
  }, [props.type, props.selectedTask]);

  const addTask = () => {
    axios
      .post("http://localhost:3000/api/tasks", values)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          initForm({});
          props.update();
          onClose();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error adding task:", error);
      });
  };

  const onClose = () => {
    if (props.onHide) {
      props.onHide();
    }
  };

  const statusUpdate = (status) => {
    values.status = status;
    console.log(props.selectedTask);
    console.log(props.selectedTask._id);

    axios
      .put(`http://localhost:3000/api/tasks/${props.selectedTask._id}`, values)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          props.update();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("Error Updating task:", err);
      })
      .finally(() => {
        props.onHide();
      });
  };

  const editTask = () => {
    axios
      .put(`http://localhost:3000/api/tasks/${props.selectedTask._id}`, values)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          props.update();
          onClose();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error editing task:", error);
      });
  };

  return (
    <>
      {props.show && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit} className="p-6">
              <div>
                <div className="flex flex-row mb-5">
                  <div className="flex basis-5/6 text-3xl leading-6 font-semibold text-blue-900 items-center justify-start">
                    {props.type === "Add" && <div> Add Task Details</div>}
                    {props.type === "View" && <div> View Task Details</div>}
                    {props.type === "Edit" && <div> Edit Task Details</div>}
                    {props.type === "State" && <div> Task Status Details</div>}
                  </div>
                  <div className="flex basis-1/6 items-center justify-end ">
                    {(props.type === "State" || props.type === "View") &&
                      (values.status ? (
                        <CheckCircleIcon
                          sx={{ fontSize: "40px", color: "green" }}
                        />
                      ) : (
                        <PendingIcon
                          sx={{ fontSize: "40px", color: "orange" }}
                        />
                      ))}
                  </div>
                </div>

                <hr />

                <div className="mb-4 mt-4">
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
                    className="mt-1 border-2 border-e-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter task name"
                    disabled={props.type === "View" || props.type === "State"}
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
                    className="mt-1 border-2 border-e-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter description"
                    disabled={props.type === "View" || props.type === "State"}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
              <hr className="mb-4" />
              {props.type === "State" ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    onClick={() => statusUpdate(false)}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={() => statusUpdate(true)}
                  >
                    Completed
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end mt-4">
                  {props.type == "Add" && (
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                      onClick={addTask}
                    >
                      Add Task
                    </button>
                  )}
                  {props.type == "Edit" && (
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                      onClick={editTask}
                    >
                      Update Task
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (!formSubmitted) {
                        props.onHide();
                        initForm({});
                      }
                    }}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
