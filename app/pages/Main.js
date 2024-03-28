import React from "react";
import styles from "../styles/main.module.css";

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
      <div class="overflow-x-auto">
        <table
          className={`${styles["table-striped"]} min-w-full divide-y divide-gray-200 border border-gray-300`}
        >
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TaskName
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <td class="px-6 py-4 whitespace-nowrap">{data.data3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
