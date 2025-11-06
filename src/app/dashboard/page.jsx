"use client"
import React, { useState } from 'react';
import { Menu, X, LogOut, Plus, Trash2, Edit2, Check } from 'lucide-react';

export default function TaskDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design landing page', status: 'todo', description: 'Create wireframes and mockups' },
    { id: 2, title: 'Setup database', status: 'inprogress', description: 'Configure PostgreSQL' },
    { id: 3, title: 'User authentication', status: 'done', description: 'Implement JWT auth' },
    { id: 4, title: 'API integration', status: 'todo', description: 'Connect frontend to backend' },
    { id: 5, title: 'Write documentation', status: 'inprogress', description: 'API docs and user guide' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });

  const handleLogout = () => {
    alert('Logging out...');
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', description: '', status: 'todo' });
      setShowAddModal(false);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleMoveTask = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const statusConfig = {
    todo: { title: 'To Do', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-200' },
    inprogress: { title: 'In Progress', color: 'bg-yellow-100 text-yellow-800', borderColor: 'border-yellow-200' },
    done: { title: 'Done', color: 'bg-green-100 text-green-800', borderColor: 'border-green-200' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600">TaskFlow</h1>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <a href="/tasks" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50">
                    Tasks
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Logout Button */}
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
                Tasks
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
            <p className="text-gray-600 mt-1">Manage and track your tasks</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{config.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                  {getTasksByStatus(status).length}
                </span>
              </div>

              <div className="space-y-3">
                {getTasksByStatus(status).map(task => (
                  <div
                    key={task.id}
                    className={`p-4 border-2 ${config.borderColor} rounded-lg bg-white hover:shadow-md transition-shadow`}
                  >
                    <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {status !== 'todo' && (
                          <button
                            onClick={() => handleMoveTask(task.id, status === 'inprogress' ? 'todo' : 'inprogress')}
                            className="text-xs text-gray-600 hover:text-indigo-600"
                          >
                            ← Back
                          </button>
                        )}
                        {status !== 'done' && (
                          <button
                            onClick={() => handleMoveTask(task.id, status === 'todo' ? 'inprogress' : 'done')}
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            {status === 'todo' ? 'Start' : 'Complete'} →
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {getTasksByStatus(status).length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
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
  );
}