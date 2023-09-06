import Image from 'next/image'
import React, { FC } from 'react'

interface InputProps {
  url?: URL
  name: string
}

const getContrastingTextColor = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 128 ? '#000000' : '#ffffff' // Return black for light backgrounds, white for dark backgrounds
}

const UserPicture: FC<InputProps> = ({ url, name }) => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  const [initial, second] = name.split(' ')
  const className = !url
    ? `w-14 h-14 rounded-full flex items-center justify-center`
    : undefined

  const contrastingTextColor = getContrastingTextColor(randomColor)

  return (
    randomColor && (
      <div
        className={className}
        style={{
          backgroundColor: randomColor,
          color: contrastingTextColor,
          fontWeight: 'bold',
        }}
      >
        {url?.href ? (
          <Image
            className="w-14 h-14 rounded-full"
            alt={`${name}  icon picture`}
            src={url.href}
            loading="lazy"
            decoding="async"
            width="14"
            height="14"
          />
        ) : (
          <div>
            <p id="initials" aria-label="Name initials" style={{}}>
              {' '}
              <span>{`${initial[0]}`}</span>
              <span className="ml-[0.1rem]">{`${second[0]}`}</span>
            </p>
          </div>
        )}
      </div>
    )
  )
}

export default UserPicture
