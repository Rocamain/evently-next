import React, { FC } from 'react'
import Places from './AutoCompletePlaces'
import SearchTextInput from './SearchTextInput'
import { WhiteMagnifier } from '@/components/Icons'
const SearchBarMobile: FC = () => {
  const searchByWords = async (formData: FormData) => {
    'use server'
  }

  const API_KEY = process.env.PLACES_API_KEY as string
  return (
    <>
      <form
        className="max-w-[740px] flex flex-row items-center justify-center mt-10 lg:hidden"
        action={searchByWords}
      >
        <div className="w-full flex flex-col items-center justify-between">
          <SearchTextInput isSmallScreen />
          <Places apiKey={API_KEY} isSmallScreen />
        </div>
        <div className="self-baseline">
          <button
            type="submit"
            className="relative bg-red-500 rounded-r-lg p-2 flex flex-col items-center justify-center"
            aria-label="Search events"
            style={{ height: '84px' }}
          >
            <div>
              <WhiteMagnifier />
            </div>
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchBarMobile
