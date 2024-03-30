"use client";
import { useState, useEffect } from "react";
import styles from "../styles/main.module.css";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskForm from "../components/TaskForm";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal from "../components/Confirmationmodal";

const Main = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState("view");
  const [update, setUpdate] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  useEffect(() => {
    (async () => await fetchTaskDetails())();
  }, [update]);

  const fetchTaskDetails = () => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => {
        setTaskDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          fetchTaskDetails();
          closeDeleteConfirmationModal();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error editing task:", error);
      });
  };

  const openDeleteConfirmationModal = (taskId) => {
    setSelectedTask(taskId);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className={`${styles["main-text"]} text-4xl font-semibold p-5`}>
          To-Do-APP
        </h1>
        <div className="grid w-full place-items-end p-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
            onClick={() => {
              setModalType("Add");
              setModalShow(true);
            }}
          >
            Add Task
          </button>
        </div>
        <div
          className="overflow-x-auto"
          style={{ maxHeight: "500px", overflowY: "scroll" }}
        >
          <table
            className={`${styles["table-striped"]} min-w-full divide-y divide-gray-200 border border-gray-300`}
          >
            <thead className={styles["thead-fixed"]}>
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  TaskName
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {taskDetails.map((data, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td
                    className={`${styles["pointer-cursor"]} px-6 py-4 whitespace-nowrap`}
                  >
                    <div
                      onClick={() => {
                        setModalType("State");
                        let temp = { ...data };
                        setSelectedTask(temp);

                        setModalShow(true);
                      }}
                      className={`${styles["status-box"]} ${
                        data.status ? styles["completed"] : styles["pending"]
                      }`}
                    >
                      {data.status ? "Completed" : "Pending"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap max-w-96 overflow-hidden overflow-ellipsis">
                    {data.description}
                  </td>
                  <td
                    className={`${styles["pointer-cursor"]} px-6 py-4 whitespace-nowrap flex flex-column gap-2`}
                  >
                    <VisibilityIcon
                      sx={{ color: "grey" }}
                      onClick={() => {
                        setModalType("View");
                        let temp = { ...data };
                        setSelectedTask(temp);
                        setModalShow(true);
                      }}
                    />
                    <EditIcon
                      sx={{ color: "green" }}
                      onClick={() => {
                        setModalType("Edit");
                        let temp = { ...data };
                        setSelectedTask(temp);
                        setModalShow(true);
                      }}
                    />
                    <DeleteIcon sx={{ color: "darkred" }} onClick={() => openDeleteConfirmationModal(data._id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TaskForm
        show={modalShow}
        type={modalType}
        selectedTask={selectedTask}
        update={() => setUpdate(!update)}
        onHide={() => {
          setModalShow(false);
          setSelectedTask(null);
        }}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this task?"
        heading="Confirmation Delete"
        onConfirm={() => deleteTask(selectedTask)}
        onCancel={closeDeleteConfirmationModal}
      />
      <Toaster />
    </>
  );
};

export default Main;
