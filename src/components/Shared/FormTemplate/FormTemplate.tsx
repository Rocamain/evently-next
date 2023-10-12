'use client'
import React, { FC, FormEvent } from 'react'
import ProfilePicture from '../ProfilePicture/ProfilePicture'

interface FormTemplateProps {
  title: string
  profilePicture?: string | null
  modal: boolean
  loading: boolean
  succeed: boolean
  children: React.ReactNode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const FormTemplate: FC<FormTemplateProps> = ({
  title,
  profilePicture,
  modal,
  loading,
  handleSubmit,
  children,
}) => {
  return (
    <div
      className={`py-0 sm:border-solid sm:border-1 sm:border-transparent sm:rounded-lg md:${
        !modal ? 'py-6' : 'py-0'
      }`}
    >
      <div className="background-blob bg-white h-screen w-full md:h-auto md:max-w-screen md:flex md:flex-col md:items-center p-11 rounded-lg border-solid border-1 border-transparent">
        <div className="sm:pt-10 sm:px-8 md:p-8 w-full flex flex-col items-center md:border-solid md:border-2 md:border-gray-400 md:rounded-lg md:max-w-lg">
          <form
            className="w-full pt-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
              </div>
              <ProfilePicture loading={loading} picture={profilePicture} />
            </div>
            <div className="w-full flex flex-col space-y-6 mb-4 mt-8">
              {children}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormTemplate
