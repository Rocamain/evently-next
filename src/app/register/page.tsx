'use client'
import axios from 'axios'
import { useState, ChangeEvent, FormEvent, FC } from 'react'

interface RegisterData {
  name: string
  lastName: string
  email: string
  password: string
  location?: string
  error: string | null
}

const INITIAL_USER_STATE = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  error: null,
}

const Page: FC = () => {
  const [registerData, setRegisterData] =
    useState<RegisterData>(INITIAL_USER_STATE)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRegisterData((prevData) => {
      if (prevData.error) {
        return {
          ...prevData,
          error: null,
          [name]: value,
        }
      }
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, lastName, email, password } = registerData

    try {
      const { status } = await axios.post('/api/auth/register', {
        email,
        password,
        name,
        lastName,
      })

      if (status === 201) {
        /*
        PENDING IMPLEMENTATION
        */
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response as {
          data: { error: string }
        }

        setRegisterData((prevData) => {
          return {
            ...prevData,
            error: errorData.data.error,
          }
        })
      }
    }
  }

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Surname"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        {registerData.error && (
          <h3 className="w-full p-2 text-gray-700 text-xl font-semibold">
            {registerData.error}
          </h3>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-semibold"
        >
          Sing up
        </button>
      </form>
    </div>
  )
}
export default Page
