'use client'
import { useState, ChangeEvent, FormEvent, FC } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { LoginData, LoginError } from '@/lib/interfaces'

const LoginPage: FC = () => {
  const router = useRouter()

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState<LoginError>({
    error: null,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (loginError) {
      setLoginError({
        error: null,
      })
    }
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoginError({
      error: null,
    })
    try {
      const { status } = await axios.post(`/api/auth/login`, loginData)
      router.refresh()
      if (status === 200) {
        /* PENDING IMPLEMENTATION */
        // router.push('/')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response as {
          data: { error: string }
        }
        if (errorData.data) {
          setLoginError({
            error: errorData.data.error,
          })
        } else {
          setLoginError({
            error: 'Server is down',
          })
        }
      }
    }
  }

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          name="email"
          placeholder="your email"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full p-2 border rounded"
          onChange={handleInputChange}
          required
        />
        <div className="min-h-[10px] w-full p-2">
          {loginError.error && (
            <h3 className=" text-gray-700 text-xl font-semibold">
              {loginError.error}
            </h3>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
