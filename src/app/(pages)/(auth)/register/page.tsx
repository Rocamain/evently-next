'use client'
import { useState, FormEvent, FC } from 'react'
import { registerUser } from '@/app/actions'
import { CustomInput } from '@/components/Shared/CustomInput/CustomInput'
import FormTemplate from '@/components/Shared/FormTemplate/FormTemplate'
import { ResponseError, UserData } from '@/lib/interfaces'
import { useRouter } from 'next/navigation'

interface RegisterPageProps {
  modal: boolean
}

const INITIAL_USER_STATE = {
  name: '',
  surname: '',
  email: '',
  password: '',
  profilePicture: null,
}
const INITIAL_ERROR = null

const RegisterPage: FC<RegisterPageProps> = ({ modal = false }) => {
  const [userData, setUser] = useState<UserData>(INITIAL_USER_STATE)
  const [file, setFile] = useState<null | string>(null)
  const [responseError, setResponseError] =
    useState<ResponseError>(INITIAL_ERROR)
  const [loading, setLoading] = useState<boolean>(false)
  const [succeed, setSucceed] = useState<boolean>(false)
  const router = useRouter()

  const handleInput = (inputData: string, inputValue: string | File | null) => {
    if (inputData === 'profilePicture') {
      if (inputValue) {
        const imageUrl = URL.createObjectURL(inputValue as File)
        setFile(imageUrl)
      } else {
        setFile(null)
      }
    }

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
    setLoading(true)

    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('surname', userData.surname)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('profilePicture', userData.profilePicture as Blob)

    const response = await registerUser(formData)

    if (response.error) {
      setResponseError(response.error.message)
      setSucceed(true)
    }
    if (response.msg === 'User created') {
      setSucceed(true)
      setTimeout(() => {
        router.replace('/login')
      }, 500)
    }

    setLoading(false)
  }

  const canSave = [...Object.values(userData)].every(Boolean)

  return (
    <FormTemplate
      modal={modal}
      handleSubmit={handleSubmit}
      loading={loading}
      title="Join to Evently"
      profilePicture={file}
      succeed={succeed}
    >
      <CustomInput
        type="text"
        label="Name"
        placeholder="Name"
        pattern="^(?=(?:[^A-Za-z]*[A-Za-z]){3})[^0-9]*$"
        autoFocus
        inputData={userData.name}
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="text"
        label="Surname"
        placeholder="Surname"
        pattern="^(?=(?:[^A-Za-z]*[A-Za-z]){3})[^0-9]*$"
        inputData={userData.surname}
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="email"
        label="Email"
        placeholder="yourname@yoursite.com"
        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        inputData={userData.email}
        handleInput={handleInput}
        handleResetError={handleResetError}
      />
      <CustomInput
        type="password"
        label="Password"
        placeholder="Type your password"
        pattern="^(?=.*\d).{8,}$"
        inputData={userData.password}
        handleInput={handleInput}
        handleResetError={handleResetError}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files && (e.target.files[0] as File)
          handleInput('profilePicture', selectedFile)
        }}
      />

      {responseError && (
        <h3 className="w-full p-2 text-gray-700 text-xl font-semibold">
          {responseError}
        </h3>
      )}

      <button
        className={`w-full p-2 ${
          !canSave ? 'bg-red-300' : 'bg-red-500'
        } text-white rounded hover:bg-red-300 font-semibold`}
        type="submit"
        disabled={!canSave}
      >
        Sing up
      </button>
    </FormTemplate>
  )
}
export default RegisterPage
