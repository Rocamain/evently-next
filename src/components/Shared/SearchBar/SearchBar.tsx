import React, { FC } from 'react'

const SearchBar: FC = () => {
  // const formRef = useRef<HTMLFormElement>(null)
  const searchByWords = async (formData: FormData) => {
    'use server'
  }

  return (
    <form
      action={searchByWords}
      className=" sm:flex sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-row items-center justify-between">
        <svg
          width="23"
          height="21"
          viewBox="0 0 23 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative left-7"
        >
          <path
            d="M22.3781 19.275L16.1906 14.25C18.7406 10.7625 18.4781 5.775 15.2906 2.625C13.6031 0.9375 11.3531 0 8.95312 0C6.55312 0 4.30313 0.9375 2.61563 2.625C-0.871875 6.1125 -0.871875 11.8125 2.61563 15.3C4.30313 16.9875 6.55312 17.925 8.95312 17.925C11.2406 17.925 13.3781 17.0625 15.0656 15.525L21.3281 20.5875C21.4781 20.7 21.6656 20.775 21.8531 20.775C22.1156 20.775 22.3406 20.6625 22.4906 20.475C22.7906 20.1 22.7531 19.575 22.3781 19.275ZM8.95312 16.2375C7.00313 16.2375 5.20313 15.4875 3.81563 14.1C0.965625 11.25 0.965625 6.6375 3.81563 3.825C5.20313 2.4375 7.00313 1.6875 8.95312 1.6875C10.9031 1.6875 12.7031 2.4375 14.0906 3.825C16.9406 6.675 16.9406 11.2875 14.0906 14.1C12.7406 15.4875 10.9031 16.2375 8.95312 16.2375Z"
            fill="gray"
          />
        </svg>

        <input
          name="searchText"
          type="text"
          placeholder="Search for events"
          className="appearance-none border p-2 pl-9 border-gray3 outline-none hover:border-gray6 focus:border-viridian hover:z-10 focus:z-10 lg:min-w-[120px] xl:min-w-[300px] rounded-l-lg flex-grow w-full rounded-r-none placeholder:text-gray6"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex-grow w-full">
          <input
            name="postcode"
            type="text"
            placeholder="Postcode, city ..."
            className="appearance-none border p-2 pl-4  border-gray3 outline-none hover:border-gray6 focus:border-viridian hover:z-10 focus:z-10  lg:min-w-[120px] xl:min-w-[250px] rounded-l-none w-full placeholder:text-gray6"
          />
        </div>
        <button
          type="submit"
          className="hidden relative bg-red-500 rounded-r-lg p-2 sm:flex flex-col items-center justify-center"
          aria-label="Search events"
          style={{ height: '42px' }}
        >
          <div>
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[20px] w-[20px]"
              >
                <path
                  d="M22.3781 19.275L16.1906 14.25C18.7406 10.7625 18.4781 5.775 15.2906 2.625C13.6031 0.9375 11.3531 0 8.95312 0C6.55312 0 4.30313 0.9375 2.61563 2.625C-0.871875 6.1125 -0.871875 11.8125 2.61563 15.3C4.30313 16.9875 6.55312 17.925 8.95312 17.925C11.2406 17.925 13.3781 17.0625 15.0656 15.525L21.3281 20.5875C21.4781 20.7 21.6656 20.775 21.8531 20.775C22.1156 20.775 22.3406 20.6625 22.4906 20.475C22.7906 20.1 22.7531 19.575 22.3781 19.275ZM8.95312 16.2375C7.00313 16.2375 5.20313 15.4875 3.81563 14.1C0.965625 11.25 0.965625 6.6375 3.81563 3.825C5.20313 2.4375 7.00313 1.6875 8.95312 1.6875C10.9031 1.6875 12.7031 2.4375 14.0906 3.825C16.9406 6.675 16.9406 11.2875 14.0906 14.1C12.7406 15.4875 10.9031 16.2375 8.95312 16.2375Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
