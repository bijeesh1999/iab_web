"use client"
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  TASK: 'task',
};

// Dummy data
const initialData = {
  todo: [
    { id: 1, title: 'Design landing page', description: 'Create mockups for the new landing page' },
    { id: 2, title: 'Write documentation', description: 'Update API documentation' },
    { id: 3, title: 'Code review', description: 'Review pull requests from the team' },
  ],
  inProgress: [
    { id: 4, title: 'Implement authentication', description: 'Add OAuth integration' },
    { id: 5, title: 'Bug fixes', description: 'Fix reported bugs from testing' },
  ],
  done: [
    { id: 6, title: 'Setup project', description: 'Initialize Next.js project' },
    { id: 7, title: 'Database schema', description: 'Design and implement database schema' },
  ],
};

function Task({ task, columnId }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { task, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}

function Column({ title, columnId, tasks, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => onDrop(item, columnId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getColumnColor = () => {
    switch (columnId) {
      case 'todo':
        return 'bg-blue-50 border-blue-200';
      case 'inProgress':
        return 'bg-yellow-50 border-yellow-200';
      case 'done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getHeaderColor = () => {
    switch (columnId) {
      case 'todo':
        return 'text-blue-700';
      case 'inProgress':
        return 'text-yellow-700';
      case 'done':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[280px] rounded-xl border-2 p-4 transition-colors ${getColumnColor()} ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="mb-4">
        <h2 className={`text-lg font-bold ${getHeaderColor()}`}>
          {title}
        </h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Task key={task.id} task={task} columnId={columnId} />
        ))}
      </div>
    </div>
  );
}

export default function DragDropBoard() {
  const [tasks, setTasks] = useState(initialData);

  const handleDrop = (item, targetColumnId) => {
    const { task, columnId: sourceColumnId } = item;

    if (sourceColumnId === targetColumnId) return;

    setTasks((prev) => {
      const newTasks = { ...prev };
      
      // Remove from source column
      newTasks[sourceColumnId] = newTasks[sourceColumnId].filter(
        (t) => t.id !== task.id
      );
      
      // Add to target column
      newTasks[targetColumnId] = [...newTasks[targetColumnId], task];
      
      return newTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Task Management Board
            </h1>
            <p className="text-gray-600">
              Drag and drop tasks between columns to update their status
            </p>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4">
            <Column
              title="To Do"
              columnId="todo"
              tasks={tasks.todo}
              onDrop={handleDrop}
            />
            <Column
              title="In Progress"
              columnId="inProgress"
              tasks={tasks.inProgress}
              onDrop={handleDrop}
            />
            <Column
              title="Done"
              columnId="done"
              tasks={tasks.done}
              onDrop={handleDrop}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}