import React, { FC } from 'react'
import AutoCompletePlacesInput from './AutoCompletePlaces'
import { WhiteMagnifier } from '@/components/Icons'
import SearchTextInput from './SearchTextInput'

const SearchBar: FC = () => {
  const searchByWords = async (formData: FormData) => {
    'use server'
  }

  const API_KEY = process.env.PLACES_API_KEY as string
  return (
    <form
      action={searchByWords}
      className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between"
    >
      <SearchTextInput />
      <div className="lg:flex lg:relative lg:flex-row lg:items-center lg:justify-between">
        <AutoCompletePlacesInput apiKey={API_KEY} isSmallScreen={false} />
        <div>
          <button
            type="submit"
            className="hidden relative bg-red-500 rounded-r-lg p-2 sm:flex flex-col items-center justify-center"
            aria-label="Search events"
            style={{ height: '42px' }}
          >
            <div>
              <WhiteMagnifier />
            </div>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
