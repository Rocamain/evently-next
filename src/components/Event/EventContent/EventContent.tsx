import React from 'react'

interface EventContentProps {
  children: React.ReactNode
}

export const EventContent: React.FC<EventContentProps> = ({ children }) => {
  return (
    <div className="border-t border-gray-200">
      <div className="relative">
        <div
          className="sm:p-0 sm:py-0 
           w-full flex flex-col justify-between"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
