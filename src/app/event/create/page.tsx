'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

interface FormData {
  eventTitle: string
  eventDescription: string
  eventCategory: 'Travel' | 'Other'
  eventLocation: string
  eventDate: string
  eventTime: string
  eventPrice: string
  eventLink: string
  file: File | null
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    eventTitle: '',
    eventDescription: '',
    eventCategory: 'Travel',
    eventLocation: '',
    eventDate: '',
    eventTime: '',
    eventPrice: '',
    eventLink: '',
    file: null,
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    console.log('run')
    if (name === 'file') {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files?.[0] || null
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }))
    } else {
      console.log('hrllo')
      setFormData((prevData) => {
        console.log(prevData, name)
        return {
          ...prevData,
          [name]: value,
        }
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const eventFormData = {
      type: 'event',
      eventOwnerId: '1',
      eventOwnerName: 'Javier Roca',
      eventOwnerEmail: 'javier@fakeemail.com',
      eventTitle: formData.eventTitle,
      eventDescription: formData.eventDescription,
      eventCategory: formData.eventCategory,
      eventLocation: formData.eventLocation,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventPrice: Number(formData.eventPrice),
      eventLink: formData.eventLink,
    }

    const jsonBlob = JSON.stringify(eventFormData)

    const formDataToSend = new FormData()
    formDataToSend.append('files', formData.file as Blob)
    formDataToSend.append('data', jsonBlob)
    console.log({ formDataToSend })
    try {
      console.log('sending')
      const a = await axios.post(
        'https://8u7ov911yf.execute-api.eu-west-2.amazonaws.com/item',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer eyJraWQiOiJVQks4WEQ2dFBFUXFDVHpaWXV4YXFvWDlDZ3VET01lcG1nR21IUWgwT20wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NmEyMDJjNC02MDgxLTcwMzYtNTQyNS1hYzMwYTYxYjhkMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9CQXVTZVd6eVoiLCJjbGllbnRfaWQiOiIxbWFnZDRwbTJmZmo0YnZjOXM0MzNycGwyZCIsIm9yaWdpbl9qdGkiOiJiN2ZkNDRhNy01YWZmLTRjNTctYTNhNC00NmYzM2QwNjdkZDUiLCJldmVudF9pZCI6IjljNTdhZmNiLTQyODYtNDYwZi05M2U5LWY5YTFmZGIxNjQxOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTE4MjgzMTQsImV4cCI6MTY5MTg2NDMxNCwiaWF0IjoxNjkxODI4MzE0LCJqdGkiOiJlODE1Mzg2OS04OWM4LTQ1OTMtOWIwOC05ODNhNWE5NzUwYmMiLCJ1c2VybmFtZSI6Ijk2YTIwMmM0LTYwODEtNzAzNi01NDI1LWFjMzBhNjFiOGQwNiJ9.B6KUco1vyNVKdz7Ks4kqdN-PLpXalhVfBZhb_VDZFaF7dHzQ6r494M8txS_OAOldta6hbfIUoEreQoq0KLRKL_i_Lm-y6XBIDn1YPvvmYiH6yKDE6RYCh4_xErgQaODihgcC43S3yZt_KONLfJwBYMTToVj-Y1k0zPJuJUYD9NkjbqNQREbAmSDffNaAus9ZL4xs9W8x53T16FANE9o7OEPoFlJ9zyHjT8cCWueETj_AbVbAdztZ7Oydlr0v4KtGEwv_L2lSMPCeTvtzzhz_9yzOhggDjRjIbpJZhnAqbQvNCLyjbn55HFAga6MuLp_R2PVLPNKH-SE_qr1SQQQi9g`,
            // Add other headers as needed
          },
        },
      )
      console.log(a)
      // Handle success
    } catch (error) {
      // Handle error
      console.log('err', error)
    }
  }

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="eventTitle"
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
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
          type="text"
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
        <input type="file" name="file" onChange={handleInputChange} required />
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
