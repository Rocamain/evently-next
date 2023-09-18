import {
  BookingBar,
  EventHeader,
  EventTitle,
  EventContent,
  EventDetails,
  EventInfo,
} from '@/components/Event/'
import { Attendee, Item, MetaDataProps } from '@/lib/interfaces'
import { getCookiesToken, getStringDate } from '@/lib/utils'
import { getEventData, updateEvent } from '@/app/actions'
import EventAttendees from '@/components/Event/EventAttendees/EventAttendees'

export async function generateMetadata({ params }: MetaDataProps) {
  const data = await getEventData(params.id)

  if (data?.items.length) {
    const { eventTitle } = data.items[0] as Item

    return { title: eventTitle || 'Not found' }
  }
}

export default async function events({ params }: { params: { id: string } }) {
  const userIdCookie = getCookiesToken()?.userInfo?.sub
  const eventInfo = await getEventData(params.id)

  if (eventInfo) {
    const event = eventInfo.items.filter(
      (item) => item.type === 'event',
    )[0] as Item
    const isEventOwner = event.eventOwnerId === userIdCookie

    const {
      eventOwnerName,
      eventTitle,
      eventLink,
      eventDateAndTime,
      eventLocation,
      eventPrice,
      eventDescription,
      eventPhotos,
    } = event as Item

    const bookings = eventInfo.items.filter(
      ({ type }) => type === 'booking',
    ) as Array<Attendee>
    const count = Number(eventInfo.count)

    const time = getStringDate(new Date(eventDateAndTime))
    return (
      <form action={updateEvent}>
        <div className="bg-white border-b border-shadowColor">
          <div className="px-4 lg-px-0 mx-auto sm:px-10 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
            <EventHeader eventOwnerName={eventOwnerName}>
              <EventTitle eventTitle={eventTitle} isOwner={isEventOwner} />
            </EventHeader>
            {/* {isEventOwner && (
          <button type="submit" name="eventId" value={eventId}>
            Modify
          </button>
        )} */}
          </div>
        </div>
        <div className="bg-gray-100/80">
          <div className="px-4 lg-px-0 mx-auto sm:px-10 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
            <div className="">
              <EventContent>
                <div className="flex flex-col-reverse mt-5 lg:pt-10 lg:flex-row lg:justify-between">
                  <div className="flex-grow lg:max-w-2xl">
                    <EventDetails
                      eventPhotos={eventPhotos}
                      eventDescription={eventDescription}
                      isOwner={isEventOwner}
                    />
                    <EventAttendees
                      count={count}
                      event={event}
                      attendees={bookings}
                    />
                  </div>
                  <EventInfo
                    time={time}
                    eventLink={eventLink}
                    eventLocation={eventLocation}
                  />
                </div>
              </EventContent>
              <BookingBar
                eventLocation={eventTitle}
                time={time}
                price={Number(eventPrice)}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
}
