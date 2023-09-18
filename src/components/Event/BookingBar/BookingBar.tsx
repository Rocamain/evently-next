import { LinkButton } from '../../Shared/LinkButton/LinkButton'
import { headers } from 'next/headers'
import React from 'react'
interface BookingBarProps {
  children?: React.ReactNode
  eventLocation: string
  time: string
  price: number
}

const getPath = () => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') as string
  return pathname
}

export const BookingBar: React.FC<BookingBarProps> = ({
  eventLocation,
  time,
  price,
}) => {
  const path = getPath()
  return (
    <div className="sticky bottom-0 bg-white w-full py-5">
      <div className="flex justify-between text-gray-500 mx-4">
        <div className="hidden sm:flex flex-col justify-center">
          <div>
            <div className="flex flex-col uppercase leading-5 tracking-tight ">
              <p className="font-semibold">{eventLocation}</p>
            </div>
          </div>
          <div>
            <time className="" dateTime={time} title={time}>
              {time}
            </time>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-around">
            <div className="flex items-center md:block">
              <div className="flex flex-col">
                <div className="font-semibold">
                  <span>{price === 1 ? 'Free' : `£${price}.00`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-5 ml-5">
              <div className="flex items-center">
                <LinkButton href={`${path}?showDialog=y`}>Book</LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
