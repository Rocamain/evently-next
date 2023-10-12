'use client'
import React, { FC, ChangeEvent, useState } from 'react'

interface ContainerInputProps {
  children: React.ReactNode
  label: string
}

interface InputProps {
  label: string
  type: string
  placeholder: string
  inputData: string
  autoFocus?: boolean
  handleInput: (inputData: string, inputValue: string) => void
  handleResetError: () => void
  pattern?: string
}

export const CustomInput: FC<InputProps> = ({
  label,
  type,
  pattern,
  placeholder,
  autoFocus,
  inputData,
  handleInput,
  handleResetError,
}) => {
  const [regexError, setRegexError] = useState<boolean>(false)
  const [isTyped, setTyped] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, pattern } = e.target
    handleResetError()
    handleInput(label.toLocaleLowerCase(), value)
    setTyped(true)
    if (!value.match(pattern)) {
      setRegexError(true)
    } else {
      setRegexError(false)
    }
  }

  return (
    <ContainerInput label={label}>
      <input
        id={label}
        className="p-2 border rounded flex-1"
        name={label}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        pattern={pattern}
        autoFocus={autoFocus}
        value={inputData}
        onChange={handleChange}
      />
      <div className="pl-2 w-5 absolute right-2">
        {isTyped && regexError && (
          <span className="text-xl text-red-500">✖</span>
        )}
        {isTyped && !regexError && (
          <span className="text-xl text-green-500">✓</span>
        )}
      </div>
    </ContainerInput>
  )
}

export const ContainerInput: FC<ContainerInputProps> = ({
  label,
  children,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-lg" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center w-full relative">{children}</div>
    </div>
  )
}
