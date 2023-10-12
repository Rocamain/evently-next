import React from 'react'
import Image from 'next/image'
import { Attendee } from '@/lib/interfaces'

interface AttendeeProps {
  attendee: Attendee
}

// interface Attendee {
//   bookingId: string
//   userId: string
//   userName: string
//   userEmail: string
//   userPicture: string
// }

const AttendeeCard: React.FC<AttendeeProps> = ({ attendee }) => {
  const { userId, userName, userPicture, isHost } = attendee
  return (
    <a href={`/user/${userId}`} className="hover:no-underline">
      <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
        {isHost && (
          <div className="bg-amber-400 text-white font-semibold text-xs py-[5px] px-[7px] rounded-md absolute left-2 -top-3">
            Host
          </div>
        )}
        <div>
          <picture>
            <img
              alt={`photo of user ${userName}`}
              src={
                userPicture.length > 0
                  ? userPicture
                  : '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg'
              }
              loading="eager"
              className="rounded-full object-cover h-[72px] w-[72px]"
            />
          </picture>
        </div>
        <span className="whitespace-pre-wrap text-center font-medium text-sm mt-3 line-clamp-2">
          {userName}
        </span>
        <span className="whitespace-pre-wrap text-xs mt-1 text-gray-600 text-center">
          {isHost ? 'Host' : 'Attendee'}
        </span>
      </div>
    </a>
  )
}

interface EventAttendeesProps {
  eventId: string
  bookings: Attendee[]
  host: Attendee
}

const EventAttendees: React.FC<EventAttendeesProps> = ({
  eventId,
  bookings,
  host,
}) => {
  const firstAttendees = bookings.slice(0, 2)
  const restAttendees = bookings.slice(2)

  return (
    <div id="attendees" className="md:max-w-screen w-full mt-5 pt-10">
      <div className="flex justify-between items-center mb-5 mx-4">
        <h2 className="font-semibold text-xl">
          Attendees ({bookings.length + 1})
        </h2>
        <a
          id="attendees-link"
          href={`/event/${eventId}/attendees/`}
          className="text-red-500 font-semibold"
        >
          See all
        </a>
      </div>
      <div>
        <div className="bg-white">
          <div className="grid grid-flow-col p-6 gap-6 sm:grid-flow-row sm:grid-cols-4 overflow-auto">
            <AttendeeCard attendee={host} />
            {firstAttendees.map((attendee, index) => (
              <AttendeeCard
                key={`attendees-link-${index}`}
                attendee={attendee}
              />
            ))}
            {restAttendees.map((attendee, index) => (
              <AttendeeCard
                key={`attendees-link-rest-${index}`}
                attendee={attendee}
              />
            ))}
            {restAttendees.length > 1 && (
              <a
                href={`/event/${eventId}/attendees/`}
                className="hover:no-underline"
              >
                <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
                  <div className="relative">
                    <div className="absolute z-10 top-6 right-5 text-xl font-medium text-white">
                      +{restAttendees.length - 3}
                    </div>

                    <ul className="flex flex-row">
                      {restAttendees
                        .slice(0, 2)
                        .map(({ userPicture }, index) => (
                          <li
                            key={`attendee-rest-${index}`}
                            className="mr-[-50px] z-0"
                          >
                            <Image
                              alt={`photo of user name`}
                              src={
                                !userPicture
                                  ? '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg'
                                  : userPicture
                              }
                              loading="lazy"
                              width={72}
                              height={72}
                              className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <span className="text-red-500 font-semibold text-center pt-3 text-sm">
                    +{bookings.length - 3} more
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventAttendees
