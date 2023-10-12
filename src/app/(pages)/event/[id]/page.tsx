import {
  BookingBar,
  EventHeader,
  EventTitle,
  EventContent,
  EventDetails,
  EventInfo,
  EventPhotos,
} from '@/components/Event/'
import { Attendee, Item, MetaDataProps } from '@/lib/interfaces'
import { getCookiesToken, getStringDate } from '@/lib/utils'
import { getEventData, updateEvent } from '@/app/actions'
import EventAttendees from '@/components/Event/EventAttendees/EventAttendees'

export async function generateMetadata({ params }: MetaDataProps) {
  const data = await getEventData(params.id)

  if (data?.items.length) {
    const { eventTitle } = data.items[0] as Item

    return { title: eventTitle }
  }
}

export default async function events({ params }: { params: { id: string } }) {
  const userId = getCookiesToken()?.userInfo?.sub as string
  const eventInfo = await getEventData(params.id)

  if (eventInfo) {
    const event = eventInfo.items.shift() as Item
    const bookings = eventInfo.items as Attendee[]

    const isEventOwner = event?.eventOwnerId === userId

    const {
      eventId,
      eventOwnerId,
      eventOwnerName,
      eventTitle,
      eventLink,
      eventDateAndTime,
      eventLocation,
      eventPrice,
      eventDescription,
      eventPhotos,
      eventOwnerPicture,
    } = event

    const time = getStringDate(new Date(eventDateAndTime))
    return (
      <>
        <form action={updateEvent}>
          <div className="bg-white border-b border-shadowColor">
            <div className="px-4 lg-px-0 mx-auto sm:px-10 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
              <EventHeader
                eventOwnerName={eventOwnerName}
                eventOwnerPicture={eventOwnerPicture}
              >
                <EventTitle eventTitle={eventTitle} isOwner={isEventOwner} />
              </EventHeader>
              {isEventOwner && (
                <button type="submit" name="eventId" value={eventId}>
                  Modify
                </button>
              )}
            </div>
          </div>
          <div className="bg-gray-200/40">
            <div className="px-4 pb-20 lg-px-0 mx-auto sm:px-10 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
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
                        eventId={eventId}
                        host={{
                          userId: eventOwnerId,
                          userName: eventOwnerName,
                          userPicture: eventOwnerPicture,
                          userEmail: 'email',
                          isHost: true,
                        }}
                        bookings={bookings}
                      />
                    </div>
                    <EventInfo
                      time={time}
                      eventLink={eventLink}
                      eventLocation={eventLocation}
                    />
                  </div>
                </EventContent>
                <EventPhotos eventId={eventId} photos={eventPhotos} />
              </div>
            </div>
          </div>
        </form>
        <BookingBar
          eventLocation={eventTitle}
          time={time}
          price={Number(eventPrice)}
        />
      </>
    )
  }
}
