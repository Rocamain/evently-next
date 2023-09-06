import React from 'react'

interface EventContentProps {
  children: React.ReactNode
}

export const EventContent: React.FC<EventContentProps> = ({ children }) => {
  return (
    <div className="bg-gray-100/80  border-t border-gray-200 sm:px-6 ">
      <div className="relative sm:max-w-4xl  xl:max-w-5xl mx-auto ">
        <div
          className="sm:p-0 sm:py-0 
           w-full flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row md:max-w-screen w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
