import { LinkButton } from '@/components/Shared/LinkButton/LinkButton'
import {
  BookingBar,
  EventHeader,
  EventTitle,
  EventContent,
  EventDetails,
} from '@/components/Event/'
import { TimeIcon, LocationIcon, WebsiteLinkIcon } from '@/components/Icons'
import { MetaDataProps } from '@/lib/interfaces'
import { getCookiesToken, getStringDate } from '@/lib/utils'
import { getEventData, updateEvent } from '@/app/actions/actions'

export async function generateMetadata({ params }: MetaDataProps) {
  const data = await getEventData(params.id)
  if (data) {
    const { eventTitle } = data

    return { title: eventTitle || 'Not found' }
  }
}

export default async function events({ params }: { params: { id: string } }) {
  const userIdCookie = getCookiesToken()?.userInfo?.sub
  const event = await getEventData(params.id)

  if (event) {
    const isEventOwner = event.eventOwnerId === userIdCookie

    const {
      eventOwnerName,
      eventTitle,
      eventLink,
      eventDateAndTime,
      eventLocation,
      eventPrice,
      eventOwnerId,
      eventDescription,
      eventPhotos,
    } = event

    const time = getStringDate(new Date(eventDateAndTime))

    return (
      <form action={updateEvent}>
        <EventHeader eventOwnerName={eventOwnerName}>
          <EventTitle eventTitle={eventTitle} isOwner={isEventOwner} />
        </EventHeader>

        <EventContent>
          <EventDetails
            eventOwnerId={eventOwnerId}
            eventPhotos={eventPhotos}
            eventDescription={eventDescription}
          />
          <div className="w-100 lg:w-90  sm:ml-16 sm:mt-10 lg:ml-28 lg:mt-10 sm:min-w-[14rem] md:min-w-[20rem]">
            <div className="pb-6 pt-7 sm:px-4 sm:bg-white sm:rounded-t-2xl">
              <div className="flex">
                <div>
                  <TimeIcon className="text-gray-500" />
                </div>
                <div className="pl-4 md:pl-4.5 lg:pl-5">
                  <time dateTime={time} title={time}>
                    {time}
                  </time>
                </div>
              </div>
              <div className="flex mt-2">
                <div>
                  <LocationIcon className="text-gray-500" />
                </div>
                <div className="pl-1  lg:pl-2">
                  <LinkButton
                    tealText
                    target="_blank"
                    href={eventLink}
                    transparent
                  >
                    {eventLocation}
                  </LinkButton>
                </div>
              </div>
              <div className="flex mt-2">
                <WebsiteLinkIcon className="text-gray-500" />
                <div className="pl-1  lg:pl-2">
                  <LinkButton tealText target="_blank" href="#" transparent>
                    link
                  </LinkButton>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center h-[230px] lg:h-[230px] bg-red-400">
              <h1>Map</h1>
            </div>
          </div>
        </EventContent>
        <BookingBar title={eventTitle} time={time} price={Number(eventPrice)} />
      </form>
    )
  }
}
