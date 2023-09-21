import React, { FC, FormEvent } from 'react'
import DropFileZone from '../DropFileZone/DropFileZone'

interface FormTemplateProps {
  title: string
  modal: boolean
  children: React.ReactNode

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const FormTemplate: FC<FormTemplateProps> = ({
  title,
  handleSubmit,
  children,
  modal,
}) => {
  return (
    <div
      className="sm:border-solid sm:border-1 sm:border-transparent sm:rounded-lg"
      style={{
        padding: !modal ? '3em 0' : '0em',
      }}
    >
      <div
        className="md:max-w-screen w-full flex flex-col items-center bg-white"
        style={{
          padding: modal ? '3em' : '0em',
          border: 'solid 1px transparent',
          borderRadius: '0.5rem',
        }}
      >
        <div className="background-blob max-w-sm md:max-w-md w-full flex flex-col items-center sm:border-solid sm:border-2 sm:border-gray-200 sm:rounded-lg px-8 md:p-12">
          <form className="w-full md:pt-4" onSubmit={handleSubmit}>
            <div className="flex items-end justify-between">
              <h1 className="text-2xl font-semibold">{title}</h1>
              <DropFileZone />
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
