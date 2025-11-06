"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { tasksList } from "@/redux/slices/task.slice";

// --- DataTable Component ---

export default function DataTable() {
  // State for filtering and searching

  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    search: "",
    status: "",
    sort: {
      field: "name",
      direction: "asc",
    },
    skip: 0,
    limit: 10,
  });
  const [showAddModal,setShowAddModal] = React.useState(false)
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });
  

  const { users, isLoading } = useSelector((state) => state.user);

  // Status options for the filter dropdown
  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pending", value: "Pending" },
    { label: "Inactive", value: "Inactive" },
  ];

  // useEffects

  React.useEffect(() => {
    console.log({ params });

    dispatch(tasksList(params));
  }, [params]);

  // Logic to handle sorting when a header is clicked
  const handleSort = (field) => {
    let action = "asc";
    if (params.sort.field === field && params.sort.direction === "asc") {
      action = "desc";
    }
    console.log({ field, action });
    setParams((prev) => ({
      ...prev,
      sort: {
        ...prev.sort,
        field,
        direction: action,
      },
    }));
  };

  //   Utility to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-700 bg-green-100 ring-green-600/20";
      case "Pending":
        return "text-yellow-700 bg-yellow-100 ring-yellow-600/20";
      case "Inactive":
        return "text-gray-600 bg-gray-50 ring-gray-500/10";
      default:
        return "text-gray-600 bg-gray-50 ring-gray-500/10";
    }
  };

  return (
    <div className="p-4 md:p-8 w-full mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          User Data Management
        </h2>

        {/* --- Controls: Search & Filter --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* 🔍 Search Field */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={params.search || ""}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* ⚙️ Sort / Filter Dropdown */}
            <div className="relative w-full md:w-48">
              <select
                value={params.sort?.opt || ""}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    sort: {
                      ...prev.sort,
                      opt: e.target.value,
                    },
                  }))
                }
                className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Sort By</option>
                <option value="createdAt">Created Date</option>
                <option value="name">Name</option>
              </select>

              {/* Asc / Desc Toggle */}
              <select
                value={params.sort?.dir || ""}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    sort: {
                      ...prev.sort,
                      dir: e.target.value,
                    },
                  }))
                }
                className="absolute right-0 top-0 h-full px-2 border-l border-gray-300 rounded-r-lg
                 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* 1. Name Header */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Title
                  </div>
                </th>
                {/* 2. Email Header */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                {/* 3. Created At Header */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Created At
                  </div>
                </th>
                {/* 4. Status Header */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((item, index) => (
                  <tr
                    key={item?._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item?.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusColor(
                          item?.status
                        )}`}
                      >
                        {item?.status || "--"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500 text-base"
                    >
                      No results found for your search criteria.
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Controls --- */}
        {/* <div className="flex flex-col md:flex-row items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalItems)} of {totalItems} entries
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            Simple Page Indicator
            <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md border border-indigo-200">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="ghost"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div> */}

              {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
