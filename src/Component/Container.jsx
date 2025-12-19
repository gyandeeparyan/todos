"use client"
import React, { useState } from 'react'
import { deleteTodos, getbyIDTodos, updateTodos } from '@/utils/api'; // Ensure updateTodos is imported
import EditForm from './Form'
import CreateForm from './Create';
import Filters from './Filters'; 
import { todos } from '@/utils/data';

const Container = ({ todolist }) => {
  const [editData, setEditData] = useState(null);
  const [view, setView] = useState('list');
  const [todoData, setTodoData] = useState(todolist || todos);
  const [filter, setFilter] = useState('all');

  const handleToggleEdit = async (id) => {
    const result = await getbyIDTodos(id);
    setEditData(result);
    setView('edit');
  };

  const handleDelete = async (id) => {
    await deleteTodos(id);
    setTodoData((prev) => prev.filter((item) => item.id !== id));
  };

  //Toggle Completion Status
  const handleToggleStatus = async (todo) => {
    const updatedStatus = !todo.completed;
    
    setTodoData((prev) => 
      prev.map((item) => item.id === todo.id ? { ...item, completed: updatedStatus } : item)
    );
    
    try {
      const result = await updateTodos(todo.id, { ...todo, completed: updatedStatus });
        console.log("Status Updated:", result ,updatedStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      // Revert if API fails
      setTodoData((prev) => 
        prev.map((item) => item.id === todo.id ? { ...item, completed: !updatedStatus } : item)
      );
    }
  };

  const handleGoBack = () => setView('list');

  const filteredData = todoData?.filter((todo) => {
    if (filter === 'completed') return todo.completed === true;
    if (filter === 'pending') return todo.completed === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-stone-100 uppercase ">TODO MANAGEMENT</h1>
          {view === 'list' && (
            <button 
              onClick={() => setView('create')}
              className="bg-green-900/30 hover:bg-green-500/30 text-green-400 border border-green-800/50 px-5 py-2 rounded-lg font-medium cursor-pointer "
            >
              + Create New
            </button>
          )}
        </div>

        {view === 'list' && <Filters currentFilter={filter} setFilter={setFilter} />}

        {view !== 'list' && (
           <button onClick={handleGoBack} className="text-stone-400 border border-stone-700 rounded-lg px-4 py-1 hover:text-stone-100 mb-6 flex items-center gap-2 cursor-pointer ">
            BACK
          </button>
        )}

        <div className=" rounded-xl border border-stone-800 shadow-xl overflow-hidden relative">
          
          {view === 'create' && <div className="p-6 text-stone-100"><CreateForm onGoBack={handleGoBack} /></div>}
          {view === 'edit' && <div className="p-6 text-stone-100"><EditForm editData={editData} todolist={todolist} onGoBack={handleGoBack} /></div>}

          {view === 'list' && (
            <div className="w-full text-sm text-stone-300">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-stone-800 border-b border-stone-700 font-semibold text-stone-400 uppercase tracking-wider">
                <span className="col-span-1">ID</span>
                <span className="col-span-2">Title</span>
                <span className="col-span-3">Description</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-4 text-center">Actions</span>
              </div>

              <div className="flex flex-col">
                {filteredData.length > 0 ? (
                  filteredData.map((list, index) => (
                    <div 
                      key={list.id || index} 
                      className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-stone-800/50 transition-colors items-center
                        ${list.completed ? 'bg-emerald-950/20' : 'hover:bg-stone-800/60'}
                      `}
                    >
                      {/* ID */}
                      <p className="col-span-1 flex justify-between md:block">
                        <span className="md:hidden font-bold text-stone-500">ID:</span>
                        <span className={`${list.completed ? 'text-emerald-500/50' : 'text-stone-100'} font-mono`}>#{list?.id}</span>
                      </p>

                      {/* Title */}
                      <p className="col-span-2 flex justify-between md:block">
                        <span className="md:hidden font-bold text-stone-500">Title:</span>
                        <span className={`truncate font-medium ${list.completed ? 'text-stone-500 line-through' : 'text-stone-200'}`}>
                          {list?.title}
                        </span>
                      </p>

                      {/* Description */}
                      <p className="col-span-3 flex justify-between md:block text-stone-400 italic">
                        <span className="md:hidden font-bold text-stone-500 ">Desc:</span>
                        <span className="line-clamp-1">{list?.description}</span>
                      </p>

                      {/* Status Badge */}
                      <p className="col-span-2 flex justify-between md:block">
                        <span className="md:hidden font-bold text-stone-500">Status:</span>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter border ${
                          list?.completed 
                          ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' 
                          : 'bg-amber-900/30 text-amber-400 border-amber-800/50'
                        }`}>
                          {list?.completed ? 'Completed' : 'Pending'}
                        </span>
                      </p>

                      {/* Actions */}
                      <div className="col-span-4 flex flex-wrap gap-2 md:justify-end pt-4 md:pt-0">
                        {/* Mark Complete Button */}
                        <button 
                          onClick={() => handleToggleStatus(list)}
                          className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-xs transition-all border cursor-pointer
                            ${list.completed 
                              ? 'bg-stone-800 border-stone-700 text-stone-500 hover:text-emerald-400' 
                              : 'bg-emerald-900/20 border-emerald-800/50 text-emerald-400 hover:bg-emerald-800/40'}
                          `}
                        >
                          {list.completed ? 'Undo' : 'Done'}
                        </button>

                        <button 
                          onClick={() => handleToggleEdit(list.id)} 
                          className="flex-1 md:flex-none bg-stone-700 hover:bg-indigo-900/30 hover:border hover:border-indigo-800/50 cursor-pointer hover:text-indigo-400 text-stone-100 px-3 py-1.5 rounded-md text-xs transition-all border border-stone-600"
                        >
                          Edit
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(list.id)} 
                          className="flex-1 md:flex-none bg-stone-700 hover:bg-rose-900/30 hover:border hover:border-rose-800/50 hover:text-rose-400 cursor-pointer text-stone-100 px-3 py-1.5 rounded-md text-xs transition-all border border-stone-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center text-stone-500">No tasks found.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Container