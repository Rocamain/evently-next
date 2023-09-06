import Link from 'next/link'
import UserPicture from '@/components/Shared/UserPicture/UserPicture'
import React from 'react'

interface EventHeaderProps {
  children: React.ReactNode
  eventOwnerName: string
}

export const EventHeader = ({ children, eventOwnerName }: EventHeaderProps) => {
  return (
    <div className="px-5">
      <div className="sm:max-w-4xl  xl:max-w-5xl mx-auto">
        <div className="pt-6 pb-8">
          {children}

          <Link href="#" className="flex flex-row mt-4 lg:mt-5">
            <UserPicture name={eventOwnerName} />
            <div className="ml-3">
              <p className="xl:text-lg ">Hosted by</p>
              <p className="xl:text-xl font-bold">{eventOwnerName}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
