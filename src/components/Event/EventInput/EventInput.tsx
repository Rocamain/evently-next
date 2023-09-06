'use client'
import {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  MouseEvent,
  FocusEvent,
} from 'react'
interface InputProps {
  data: string
  label?: string
  type: string
  placeholder?: string
  autoFocus?: boolean
  handleInput?: (inputData: string, inputValue: string) => void
  handleResetError?: () => void
  pattern?: string
  name:
    | 'eventTitle'
    | 'eventPhotos'
    | 'eventDescription'
    | 'eventTime'
    | 'eventLink'
    | 'eventPrice'
  className: string
}

export const EventInput = ({ data, type, name, className }: InputProps) => {
  const [inputData, setInputData] = useState<string>(data)
  const [dataToSend, setDataToSend] = useState<string | undefined>()
  const [isEdit, setEdit] = useState<boolean>(false)
  const [saved, setSave] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [regexError, setRegexError] = useState<boolean>(false)
  const [isTyped, setTyped] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value, pattern } = e.target
    setInputData(value)
    setTyped(true)
    if (!value.match(pattern)) {
      setRegexError(true)
    } else {
      setRegexError(false)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      if (isEdit) {
        inputRef.current.focus()
      } else {
        inputRef.current.blur()
      }
    }
  }, [isEdit, inputRef])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation()
    if (e.currentTarget.innerText === '...Edit') {
      setDataToSend(inputData)
    }

    setEdit((prev) => !prev)
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.innerHTML !== 'Save') {
      setInputData(dataToSend as string)
      setEdit(false)
    } else {
      setSave(true)
      setEdit(true)
    }
    setTyped(false)
  }

  return (
    <>
      {isEdit || saved ? (
        <div className="relative flex">
          <input
            ref={inputRef}
            id={name}
            name={name}
            className={className}
            type={type}
            value={inputData}
            onChange={handleChange}
            onBlur={handleBlur}
            pattern="^(.{8,20})$"
            disabled={!dataToSend}
          />
          <div className="pl-2 w-5 absolute right-2">
            {isTyped && regexError && (
              <span className="text-xl text-red-500">✖</span>
            )}
            {isTyped && !regexError && (
              <span className="text-xl text-green-500">✓</span>
            )}
          </div>
        </div>
      ) : (
        <h3 className={className}>{inputData}</h3>
      )}

      <button
        onClick={handleClick}
        type="button"
        className="text-gray-400 hover:text-red-400  text-xl font-bold"
      >
        {isEdit ? 'Save' : '...Edit'}
      </button>
    </>
  )
}
