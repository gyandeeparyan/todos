"use client"

import React from 'react'

const Filters = ({ currentFilter, setFilter }) => {
  return (
    <div className='flex items-center justify-center my-6 gap-4'>
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-1 rounded-lg border transition-all cursor-pointer ${
            currentFilter === 'all' 
            ? 'bg-blue-600 text-white border-blue-500' 
            : 'bg-blue-900/30 border-blue-800/50 text-blue-400 hover:bg-blue-900/50'
          }`}
        >
          All
        </button>
        
        <div className='flex items-center justify-center gap-4'>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-4 py-1 rounded-lg border transition-all cursor-pointer ${
              currentFilter === 'completed' 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : 'bg-emerald-900/30 border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50'
            }`}
          >
            Completed
          </button>
          
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-1 rounded-lg border transition-all cursor-pointer ${
              currentFilter === 'pending' 
              ? 'bg-amber-600 text-white border-amber-500' 
              : 'bg-amber-900/30 border-amber-800/50 text-amber-400 hover:bg-amber-900/50'
            }`}
          >
            Pending
          </button>
        </div>
    </div>
  )
}

export default Filters