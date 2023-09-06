import React from 'react'
import { EventInput } from '../EventInput/EventInput'

interface EventTitleProps {
  eventTitle: string
  isOwner: boolean
}

export const EventTitle: React.FC<EventTitleProps> = ({
  eventTitle,
  isOwner,
}) => {
  const className = 'pl-2 text-2xl xl:text-3xl font-bold'
  return (
    <div className="flex gap-5">
      {isOwner ? (
        <EventInput
          className={className + ' focus:bg-slate-100'}
          name="eventTitle"
          type="text"
          data={eventTitle}
        />
      ) : (
        <h3 className={className}>{eventTitle}</h3>
      )}
      {isOwner && (
        <button name="submit" value="Send Request" type="submit">
          Modify
        </button>
      )}
    </div>
  )
}
