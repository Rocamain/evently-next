import { EventDescription, EventPicture } from '@/components/Event/index'

interface EventDetailsProps {
  eventDescription: string
  eventPhotos: string[]
  isOwner: boolean
}

export const EventDetails = ({
  eventDescription,
  eventPhotos,
  isOwner,
}: EventDetailsProps) => {
  return (
    <div className=" flex-grow">
      <EventPicture eventPicture={eventPhotos[0]} isOwner={isOwner} />
      <EventDescription eventDescription={eventDescription} isOwner={isOwner} />
    </div>
  )
}
