"use client"
import { createTodos } from '@/utils/api';
import React, { useState } from 'react'

const CreateForm = ({ onGoBack }) => {
  const [editDetails, setEditDetails] = useState({
    id: "",
    title: "",
    description: "",
    userId: 0,
    createdAt: Date.now(),
    completed: false
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateData = async () => {
    const payload = {
      ...editDetails,
      id: String(editDetails.id),
      title: String(editDetails.title),
      description: String(editDetails.description),
      userId: Number(editDetails.userId),
      createdAt: Date.now(),
      completed: false,
    };

    try {
      const result = await createTodos(payload);
      console.log("Success:", result);
      if(onGoBack) onGoBack(); 
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="flex flex-col   items-center justify-center min-h-[60vh] py-12">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-stone-800/5 border border-stone-700 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        <div className="mb-8 flex gap-3">
             <div className="h-8 w-1 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-stone-100">CREATE NEW TASK</h2>
        
        </div>

        <div className="space-y-5">
          {/* ID Input */}
          <div>
            <label htmlFor="id" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Task ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={editDetails.id}
              onChange={handleOnChange}
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="e.g. 101"
              required
            />
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editDetails.title}
              onChange={handleOnChange}
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={editDetails.description}
              onChange={handleOnChange}
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="What needs to be done?"
              required
            />
          </div>

          {/* User ID / Category */}
          <div>
            <label htmlFor="userId" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              User ID
            </label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={editDetails.userId}
              onChange={handleOnChange}
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="e.g. 1"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleCreateData}
            className="w-full bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 cursor-pointer  font-bold py-3 px-4 rounded-lg "
          >
            CREATE
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default CreateForm;