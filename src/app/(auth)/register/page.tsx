'use client'
import { useState, FormEvent, FC } from 'react'
import { registerUser } from '@/app/actions/actions'
import { CustomInput } from '@/components/Shared/CustomInput/CustomInput'
import FormTemplate from '@/components/Shared/FormTemplate/FormTemplate'
import { ResponseError, UserData } from '@/lib/interfaces'

const INITIAL_USER_STATE = {
  name: '',
  surname: '',
  email: '',
  password: '',
}
const INITIAL_ERROR = null

const RegisterPage: FC = () => {
  const [userData, setUser] = useState<UserData>(INITIAL_USER_STATE)
  const [responseError, setResponseError] =
    useState<ResponseError>(INITIAL_ERROR)

  const handleInput = (inputData: string, inputValue: string) => {
    setUser((prevData) => ({
      ...prevData,
      [inputData]: inputValue,
    }))
  }
  const handleResetError = () => {
    setResponseError(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await registerUser(userData)

    if (response.error) {
      setResponseError(response.error.message)
    }
    if (response.message === 'User created') {
      // PENDING IMPLEMENTATION FOR SUCCESS
      console.log('Created')
    }
  }

  const canSave = [...Object.values(userData)].every(Boolean)

  return (
    <FormTemplate handleSubmit={handleSubmit} title="Join to Evently">
      <CustomInput
        type="text"
        label="Name"
        placeholder="Name"
        pattern="^(?=(?:[^A-Za-z]*[A-Za-z]){3})[^0-9]*$"
        autoFocus
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="text"
        label="Surname"
        placeholder="surname"
        pattern="^(?=(?:[^A-Za-z]*[A-Za-z]){3})[^0-9]*$"
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="email"
        label="Email"
        placeholder="yourname@yoursite.com"
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="password"
        label="Password"
        placeholder="Type your password"
        pattern="^(?=.*\d).{8,}$"
        handleInput={handleInput}
        handleResetError={handleResetError}
      />

      {responseError && (
        <h3 className="w-full p-2 text-gray-700 text-xl font-semibold">
          {responseError}
        </h3>
      )}

      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold"
        type="submit"
        disabled={!canSave}
      >
        Sing up
      </button>
    </FormTemplate>
  )
}
export default RegisterPage
