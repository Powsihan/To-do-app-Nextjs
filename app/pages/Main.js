import React from "react";
import styles from "../styles/main.module.css";


import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Main = () => {
  const datas = [
    { data1: "helooo", data2: "new", data3: "husahdu" },
    { data1: "helooo", data2: "new", data3: "husahdu" },
    { data1: "helooo", data2: "new", data3: "husahdu" },
    { data1: "helooo", data2: "new", data3: "husahdu" },
  ];
  return (
    <div className="flex flex-col items-center">
      <h1 className={`${styles["main-text"]} text-4xl font-semibold p-5`}>
        To-Do-APP
      </h1>
      <div className="grid w-full place-items-end p-5">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">Add Task</button>
      </div>
      <div class="overflow-x-auto">
        <table
          className={`${styles["table-striped"]} min-w-full divide-y divide-gray-200 border border-gray-300`}
        >
          <thead>
            <tr>
              <th class="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                No
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                TaskName
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, i) => (
              <tr key={i}>
                <td class="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap">{data.data1}</td>
                <td class="px-6 py-4 whitespace-nowrap">{data.data2}</td>
                <td class="px-6 py-4 whitespace-nowrap">{data.data2}</td>
                <td class="px-6 py-4 whitespace-nowrap flex flex-column gap-2">
                  <VisibilityIcon sx={{color:'grey'}}/>
                  <EditIcon sx={{color:'green'}}/>
                  <DeleteIcon sx={{color:'darkred'}}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
