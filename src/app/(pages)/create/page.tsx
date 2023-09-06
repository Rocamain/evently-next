'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { createEvent } from '@/app/actions/actions'

interface EventData {
  data: {
    type: 'booking' | 'event'
    eventTitle: string
    eventDescription: string
    eventCategory: 'Travel' | 'Other'
    eventLocation: string
    eventDate: string
    eventTime: string
    eventPrice: number
    eventLink: string
  }
  files: File | null
}

const initialState: EventData = {
  data: {
    type: 'event',
    eventTitle: '',
    eventDescription: '',
    eventCategory: 'Travel',
    eventLocation: '',
    eventDate: '',
    eventTime: '',
    eventPrice: 0,
    eventLink: '',
  },
  files: null,
}
// const INITIAL_ERROR = null
const Page: React.FC = () => {
  const [formData, setFormData] = useState<EventData>(initialState)
  // const [responseError, setResponseError] =
  //   useState<ResponseError>(INITIAL_ERROR)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    if (name === 'files') {
      const fileInput = e.target as HTMLInputElement
      const selectedFiles = fileInput.files as FileList

      if (selectedFiles.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          files: selectedFiles[0],
        }))
      } else {
        setFormData((prevData) => ({
          ...prevData,
          files: null,
        }))
      }
    } else {
      setFormData((prevData) => {
        return name === 'eventPrice'
          ? {
              ...prevData,
              data: {
                ...prevData.data,
                [name]: Number(value),
              },
            }
          : {
              ...prevData,
              data: {
                ...prevData.data,
                [name]: value,
              },
            }
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('files', formData.files as Blob)
    formDataToSend.append('data', JSON.stringify(formData.data))

    await createEvent(formDataToSend)
  }

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Input fields */}
        <input
          type="text"
          name="eventTitle"
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          value={formData.data.eventTitle}
          required
        />
        <input
          type="text"
          name="eventDescription"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="eventCategory"
          placeholder="Category"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="eventLocation"
          placeholder="Location"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="eventDate"
          placeholder="DD-MM-YYYY"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="eventTime"
          placeholder="HH:MM"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          min="0"
          // value={0}
          name="eventPrice"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="eventLink"
          placeholder="Link"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        {/* Add other input fields similarly */}
        <input type="file" name="files" onChange={handleInputChange} required />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}

export default Page
