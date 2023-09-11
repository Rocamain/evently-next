'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider/AuthProvider'
import Image from 'next/image'

interface EventDetailsProps {
  eventDescription: string
  eventPhotos: string[]
  eventOwnerId: string
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  eventDescription,
  eventPhotos,
  eventOwnerId,
}) => {
  const { user } = useAuth()
  const [edit, setEdit] = useState(true)
  const [content, setContent] = useState<string | null>(eventPhotos[0])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setEdit((prev) => !prev)
  }

  useEffect(() => {
    if (inputRef.current && !edit) {
      inputRef.current.focus()
    }
  }, [edit, inputRef])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    const selectedFiles = fileInput.files as FileList

    const file = selectedFiles[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContent(imageUrl)
    } else {
      setContent('/images/austin-distel-rxpThOwuVgE-unsplash.jpg')
    }
  }

  const photoUrl = content || '/images/austin-distel-rxpThOwuVgE-unsplash.jpg'

  return (
    <div className="flex flex-col  flex-grow justify-center ">
      {edit ? (
        <Image
          alt={edit ? 'event picture' : 'new uploaded picture'}
          width={220}
          height={140}
          className="w-full"
          src={photoUrl}
        />
      ) : (
        <div className="h-[140px] flex justify-center items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            name="files"
            onChange={handleChange}
            required
          />
        </div>
      )}
      {eventOwnerId === user.userInfo?.sub && (
        <div className="h-[140px] flex justify-center items-center">
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-red-400  text-xl font-bold"
          >
            {edit ? '...Edit' : '   Save'}
          </button>
        </div>
      )}

      <div className="py-5">
        <h4 className="text-xl font-bold mb-5">Details</h4>
        <p className="mb-4">{eventDescription}</p>
      </div>
    </div>
  )
}
