"use client"
import React, { useState } from 'react'
import { updateTodos } from '@/utils/api.js';

const EditForm = ({ editData, onGoBack }) => {
  const [editDetails, setEditDetails] = useState({
    id: editData?.id || 0,
    title: editData?.title || "",
    description: editData?.description || "",
    userId: editData?.userId || 0,
    completed: editData?.completed || false
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveData = async () => {
    //validations
   if (editDetails.title.trim() === "") {
    alert("Title cannot be empty!");
    return
} 
 if (editDetails.description.trim() === "") {
    alert("Description cannot be empty!");
    return
} 
 if (isNaN(editDetails.userId) || editDetails.userId <= 0) {
    alert("Please provide a valid User ID number!");
    return
} 

    const payload = {
      ...editDetails,
      id: Number(editDetails.id),
      userId: Number(editDetails.userId),
      updatedAt: Date.now(), // Keeping track of edits
    };

    try {
      const result = await updateTodos(editDetails.id, payload);
      console.log("Update Success:", result);
      if(result) window.location.reload()

      if (onGoBack) onGoBack(); 
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-[60vh] md:p-12">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-stone-800/50 border border-stone-700  p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-stone-100">EDIT TASK</h2>
          </div>
          <p className="text-stone-400 text-sm mt-1">Modify the details for Task #{editDetails.id}</p>
        </div>

        <div className="space-y-5">
          {/* ID Input - Read Only for Edits usually, but kept as per your logic */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Task ID (Immutable)
            </label>
            <input
              type="number"
              name="id"
              value={editDetails.id}
              disabled
              className="w-full bg-stone-900/50 border border-stone-800 text-stone-500 text-sm rounded-lg px-4 py-3 cursor-not-allowed"
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
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="Task title"
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
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              placeholder="Task details..."
              required
            />
          </div>

          {/* User ID */}
          <div>
            <label htmlFor="userId" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Assigned User ID
            </label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={editDetails.userId}
              onChange={handleOnChange}
              className="w-full bg-stone-900 border border-stone-700 text-stone-100 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all px-4 py-3 placeholder:text-stone-600"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleSaveData}
            className="w-full bg-indigo-900/30 border border-emerald-800/50 text-indigo-400 cursor-pointer  font-bold py-3 px-4 rounded-lg "
          >
            UPDATE
          </button>
          
          
        </div>
      </div>
    </div>
  );
}

export default EditForm;