'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'

interface EventPictureProps {
  isOwner: boolean
  eventPicture: string
}
// Define a placeholder image URL or import it from your resources
const PLACEHOLDER = '/images/austin-distel-rxpThOwuVgE-unsplash.jpg'

export const EventPicture: React.FC<EventPictureProps> = ({
  isOwner,
  eventPicture,
}) => {
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState<string | null>(eventPicture)
  const inputRef = useRef<HTMLInputElement>(null)
  // Set the initial image URL to the event picture or the placeholder
  const photoUrl = content || PLACEHOLDER

  const handleEditToggle = () => {
    if (isOwner) {
      // If the user is the owner, toggle the edit mode
      setEdit((prev) => !prev)
    } else {
      // If the user is not the owner, trigger the file input click
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    const selectedFiles = fileInput.files as FileList
    const file = selectedFiles[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContent(imageUrl)
    } else {
      setContent(PLACEHOLDER)
    }
  }

  return !isOwner ? (
    // Display the image for non-owners
    <Image
      alt={edit ? 'event picture' : 'new uploaded picture'}
      width={220}
      height={140}
      className="w-full"
      src={photoUrl}
    />
  ) : edit ? (
    // Display the image and "Change Photo" label in edit mode
    <div className="flex-grow relative">
      <label
        htmlFor="fileInput"
        className="cursor-pointer relative block w-full h-full"
      >
        <div className="group">
          <Image
            alt={edit ? 'event picture' : 'new uploaded picture'}
            width={220}
            height={140}
            className="w-full hover:filter hover:grayscale"
            src={photoUrl}
            onClick={handleEditToggle}
          />
          <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-md p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium rounded-md">
            Change Photo
          </div>
        </div>
        <input
          id="fileInput"
          ref={inputRef}
          type="file"
          accept="image/*"
          name="files"
          onChange={handleChange}
          required
          className="opacity-0"
        />
      </label>
    </div>
  ) : (
    // Display the image without the "Change Photo" label
    <div className="flex-grow relative">
      <div className="group">
        <Image
          alt="event picture"
          width={220}
          height={140}
          className="w-full hover:filter hover:grayscale"
          src={photoUrl}
          onClick={handleEditToggle}
        />
        <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-md p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium rounded-md">
          Change Photo
        </div>
      </div>
    </div>
  )
}

export default EventPicture
