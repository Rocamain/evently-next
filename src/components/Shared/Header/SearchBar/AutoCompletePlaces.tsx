/* eslint-disable camelcase */
'use client'

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useState, useEffect, MouseEvent } from 'react'

interface AutoCompletePlacesProps {
  apiKey: string
  isSmallScreen?: boolean
}

interface AddressInfo {
  short_name: string
  types: string[]
}
interface Place {
  id: string
  name: string
  lat: number
  lng: number
  addressInfo?: AddressInfo[]
}

export default function AutoCompletePlaces({
  apiKey,
  isSmallScreen = false,
}: AutoCompletePlacesProps) {
  const [inputValue, setValue] = useState('')
  const [place, setPlace] = useState<Place>({
    id: '',
    name: '',
    lat: 0,
    lng: 0,
  })

  const { placePredictions, getPlacePredictions, placesService } =
    usePlacesService({
      apiKey,
      libraries: ['places'],
      options: {
        input: inputValue,
        componentRestrictions: { country: 'gb' },
      },
      debounce: 350,
      language: 'en-gb',
    })
  const [showPredictions, setShow] = useState(Boolean(placePredictions.length))

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (
        !(
          e.target instanceof HTMLInputElement &&
          e.target.name === 'autocompleteText'
        )
      ) {
        setShow(false)
      }
    }
    if (showPredictions) {
      window.addEventListener('click', handler)
    }
    return window.removeEventListener('click', handler)
  }, [showPredictions])

  useEffect(() => {
    setValue(place.name)
  }, [place])

  const inputClassName =
    'relative appearance-none border p-2 pl-4 border-gray-300 outline-none hover:border-gray-300 focus:border-gray-400 hover:z-10 focus:z-10 lg:min-w-[120px] xl:min-w-[250px] w-full placeholder:text-gray-400 ' +
    (isSmallScreen
      ? ` ${placePredictions.length ? 'rounded-none' : 'rounded-bl-lg'}`
      : 'rounded-l-none')

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    { placeId, description }: { placeId: string; description: string },
  ) => {
    if (placeId !== place.id) {
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
          fields: [
            'geometry.location',
            'place_id',
            'address_components',
            'name',
          ],
        },
        (placeDetails) => {
          if (
            placeDetails?.geometry?.location?.lat &&
            placeDetails?.place_id &&
            placeDetails?.address_components
          ) {
            const lat = placeDetails.geometry.location.lat()
            const lng = placeDetails.geometry.location.lng()
            const id = placeDetails.place_id
            const addressInfo = [...placeDetails?.address_components]

            setPlace({
              name: description,
              id,
              lat,
              lng,
              addressInfo,
            })
          }
        },
      )
    }
  }

  return (
    <div className="relative flex-grow w-full">
      <div className="sticky top-0 flex items-center">
        <input
          name="autocompleteText"
          type="text"
          placeholder="City, postcode ..."
          className={inputClassName}
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value })
            setValue(evt.target.value)
          }}
          onFocus={() => {
            setShow(true)
          }}
          value={inputValue}
        />
      </div>

      {showPredictions && (
        <ul className="flex flex-col absolute rounded-b-lg border border-gray-300 bg-white w-full">
          {placePredictions.map(({ description, place_id }, index) => (
            <li
              className="px-4 border border-gray-100"
              key={index + '-' + description}
            >
              <button
                className="w-full text-left py-3 text-gray-500"
                onClick={(e) =>
                  handleClick(e, { placeId: place_id, description })
                }
              >
                {description}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
