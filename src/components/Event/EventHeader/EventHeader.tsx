import Link from 'next/link'
import UserPicture from '@/components/Shared/UserPicture/UserPicture'
import React from 'react'

interface EventHeaderProps {
  children: React.ReactNode
  eventOwnerName: string
}

export const EventHeader = ({ children, eventOwnerName }: EventHeaderProps) => {
  return (
    <div className="mx-4 pt-6 pb-6">
      {children}
      <Link href="#" className="flex flex-row mt-2 lg:mt-4">
        <UserPicture name={eventOwnerName} />
        <div className="ml-3">
          <p className="xl:text-lg">Hosted by</p>
          <p className="xl:text-xl font-bold">{eventOwnerName}</p>
        </div>
      </Link>
    </div>
  )
}
