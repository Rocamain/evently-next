import React from 'react'
import Image from 'next/image'
import { Attendee, Item } from '@/lib/interfaces'

interface InputProps {
  attendees: Array<Attendee>
  event: Item
  count: number
}

const EventAttendees = ({ count, attendees, event }: InputProps) => {
  const firstAttendees = attendees.slice(0, 2)
  const restAttendees = attendees.slice(2, attendees.length)

  return (
    <div id="attendees" className="md:max-w-screen w-full mt-5 pt-10">
      <div className="flex justify-between items-center mb-5 mx-4">
        <h2 className="font-semibold text-xl">Attendees ({count})</h2>
        <a
          id="attendees-link"
          href={`/event/${event.eventId}/attendees/`}
          className="text-red-500 font-semibold"
        >
          See all
        </a>
      </div>
      <div>
        <div className="bg-white">
          <div>
            <div className="grid grid-flow-col p-6 gap-6 sm:grid-flow-row sm:grid-cols-4 overflow-auto">
              <a
                id="attendees-link-0"
                className="hover:no-underline"
                href="/profile/ownerId"
              >
                <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
                  <div className="bg-amber-400 text-white font-semibold text-xs py-[5px] px-[7px] rounded-md absolute left-2 -top-3">
                    Host
                  </div>
                  <div>
                    <picture>
                      <img
                        alt="photo of organizer"
                        src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                        loading="eager"
                        className="rounded-full object-cover h-[72px] w-[72px]"
                      />
                    </picture>
                  </div>
                  <span className="whitespace-pre-wrap text-center font-medium text-sm mt-3 line-clamp-2">
                    {event.eventOwnerName}
                  </span>
                  <span className="whitespace-pre-wrap  text-xs mt-1 text-gray-600 text-center">
                    Event host
                  </span>
                </div>
              </a>
              {firstAttendees.map((attendee, index) => (
                <a
                  key={`attendees-link-${index + 1}`}
                  id={`attendees-link-${index + 1}`}
                  className="hover:no-underline"
                  href={`/user/${attendee.userId}`}
                >
                  <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
                    <div>
                      <picture>
                        <img
                          alt={`photo of user ${attendee.userName}`}
                          src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                          loading="eager"
                          className="rounded-full object-cover h-[72px] w-[72px]"
                        />
                      </picture>
                    </div>
                    <span className="whitespace-pre-wrap text-center font-medium text-sm mt-3 line-clamp-2">
                      {attendee.userName}
                    </span>
                    <span className="whitespace-pre-wrap text-xs mt-1 text-gray-600 text-center">
                      Member
                    </span>
                  </div>
                </a>
              ))}

              {restAttendees.length < 2 && (
                <a
                  id={`attendees-link-3`}
                  className="hover:no-underline"
                  href={`/user/${restAttendees[0].userId}`}
                >
                  <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
                    <div>
                      <picture>
                        <img
                          alt={`photo of user ${restAttendees[0].userName}`}
                          src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                          loading="eager"
                          className="rounded-full object-cover h-[72px] w-[72px]"
                        />
                      </picture>
                    </div>
                    <span className="whitespace-pre-wrap text-center font-medium text-sm mt-3 line-clamp-2">
                      {restAttendees[0].userName}
                    </span>
                    <span className="whitespace-pre-wrap text-xs mt-1 text-gray-600 text-center">
                      Member
                    </span>
                  </div>
                </a>
              )}
              {restAttendees.length > 1 && (
                <a
                  className="hover:no-underline"
                  href={`/event/${event.eventId}/attendees/`}
                >
                  <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
                    <div className="relative">
                      <div className="absolute z-10 top-6 right-5 text-xl font-medium text-white">
                        {restAttendees.length > 1 ? `+${count - 3}` : ''}
                      </div>

                      <ul className="flex flex-row">
                        {restAttendees.length === 2 && (
                          <>
                            <li className="mr-[-50px] z-0">
                              <Image
                                alt="photo of user name"
                                src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                                loading="lazy"
                                width={72}
                                height={72}
                                className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                              />
                            </li>
                            <li className="z-2">
                              <Image
                                alt="photo of user name"
                                src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                                loading="lazy"
                                width={72}
                                height={72}
                                className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                              />
                            </li>
                          </>
                        )}

                        {restAttendees.length > 2 && (
                          <>
                            <li className="mr-[-50px] z-0">
                              <Image
                                alt="photo of user name"
                                src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                                loading="lazy"
                                width={72}
                                height={72}
                                className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                              />
                            </li>
                            <li className="mr-[-50px] z-1">
                              <Image
                                alt="photo of user name"
                                src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                                loading="lazy"
                                width={72}
                                height={72}
                                className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                              />
                            </li>
                            <li className="z-2">
                              <Image
                                alt="photo of user name"
                                src="/images/jimmy-dean-my1mDMraGf0-unsplash.jpg"
                                loading="lazy"
                                width={72}
                                height={72}
                                className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                              />
                            </li>{' '}
                          </>
                        )}
                      </ul>
                    </div>
                    <span className="text-red-500 font-semibold text-center pt-3 text-sm">
                      {restAttendees.length > 1 ? `+${count - 3} more` : ''}
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventAttendees
