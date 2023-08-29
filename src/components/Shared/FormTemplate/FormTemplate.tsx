import React, { FC, FormEvent } from 'react'

interface FormTemplateProps {
  title: string
  children: React.ReactNode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const FormTemplate: FC<FormTemplateProps> = ({
  title,
  handleSubmit,
  children,
}) => {
  return (
    <div className="md:max-w-screen w-full flex flex-col items-center mb-16 mt-4 sm:mt-10">
      <div className="max-w-sm md:max-w-md w-full p-12 md:p-12 sm:pb-15 flex flex-col items-center sm:border-solid sm:border-2 sm:border-gray-200 sm:rounded-lg background-blob">
        <form className="w-full md:pt-8" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-semibold mb-2">{title}</h1>
          </div>
          <div className="w-full flex flex-col space-y-6 mb-4 mt-8">
            {children}
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormTemplate
