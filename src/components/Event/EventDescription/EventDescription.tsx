'use client'
import React from 'react'
import { EventDescriptionEdit } from './EventDescriptionEdit'
interface EventDetailsProps {
  eventDescription: string
  isOwner: boolean
}

export const EventDescription: React.FC<EventDetailsProps> = ({
  eventDescription,
  isOwner,
}) => {
  return isOwner ? (
    // If the user is the owner, render an EventDescriptionEdit component that allows editing the event description
    <EventDescriptionEdit
      data={eventDescription}
      type="textArea"
      name="eventDescription"
      pattern="^(.{8,20})$"
    />
  ) : (
    // If the user is not the owner, display the event description as plain text
    <div className="py-5 mb-5 p-2">
      <h4 className="text-xl font-bold">Details</h4>
      <p className="mb-4 p-2">{eventDescription}</p>
    </div>
  )
}
