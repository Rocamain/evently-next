import React from 'react'
import { TimeIcon, LocationIcon, WebsiteLinkIcon } from '@/components/Icons'
import Link from 'next/link'

interface EventInfoProps {
  time: string
  eventLink: string
  eventLocation: string
}

export const EventInfo: React.FC<EventInfoProps> = ({
  time,
  eventLink,
  eventLocation,
}) => {
  return (
    <div>
      <div className="lg:ml-8 xl:ml-24 lg:min-w-[280px] lg:max-w-[250px] border-b border-shadowColor sticky top-3">
        <div className="pb-6 border-b border-shadowColor lg:bg-white sm:rounded-t-2xl lg:pt-7">
          <div className="flex flex-col mx-4">
            <div className="flex">
              <div>
                <TimeIcon className="text-gray-500 mt-2" />
              </div>
              <div className="ml-2 p-2">
                <time dateTime={time} title={time}>
                  {time}
                </time>
              </div>
            </div>

            <div className="flex">
              <div>
                <LocationIcon className="text-gray-500 mt-2" />
              </div>
              <Link target="_blank" href={eventLink} className="ml-2 p-2">
                {eventLocation}
              </Link>
            </div>

            <div className="flex">
              <div>
                <WebsiteLinkIcon className="text-gray-500 mt-2" />
              </div>
              <Link target="_blank" href={eventLink} className="ml-2 p-2">
                link
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center h-[230px] lg:h-[230px] bg-red-400">
          <h1>Map</h1>
        </div>
      </div>
    </div>
  )
}
