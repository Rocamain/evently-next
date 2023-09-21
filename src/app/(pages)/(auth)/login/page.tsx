'use client'
import { useState, ChangeEvent, FormEvent, FC } from 'react'
import { useAuth } from '@/context/AuthProvider/AuthProvider'
import { LoginData, LoginError } from '@/lib/interfaces'
import FormTemplate from '@/components/Shared/FormTemplate/FormTemplate'
import { ContainerInput } from '@/components/Shared/CustomInput/CustomInput'

interface LoginPageProps {
  modal: boolean
}

const INITIAL_USER_STATE = {
  email: '',
  password: '',
}

const LoginPage: FC<LoginPageProps> = ({ modal = false }) => {
  const { login } = useAuth()
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_USER_STATE)
  const [loginError, setLoginError] = useState<LoginError>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (loginError) {
      setLoginError(null)
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
    setLoginError(null)
    const { error } = await login(loginData)

    if (error) {
      setLoginError(error.message)
    } else {
      // PENDING IMPLEMENTATION FOR SUCCESS
    }
  }
  const canSave = [...Object.values(loginData)].every(Boolean)

  return (
    <FormTemplate
      modal={modal}
      title="Evently Login!"
      handleSubmit={handleSubmit}
    >
      <ContainerInput label="Username">
        <input
          id="Username"
          className="w-full p-2 border rounded"
          type="text"
          name="email"
          placeholder="your email"
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          required
        />
      </ContainerInput>
      <ContainerInput label="Password">
        <input
          id="Password"
          className="w-full p-2 border rounded"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
      </ContainerInput>
      <div className="min-h-[10px] w-full p-2">
        {loginError && (
          <h3 className=" text-gray-700 text-xl font-semibold">{loginError}</h3>
        )}
      </div>
      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        type="submit"
        disabled={!canSave}
      >
        Login
      </button>
    </FormTemplate>
  )
}

export default LoginPage
