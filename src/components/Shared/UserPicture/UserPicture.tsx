import Image from 'next/image'
import React, { FC } from 'react'

interface InputProps {
  picture: string
  name: string
}

const UserPicture: FC<InputProps> = ({ name, picture }) => {
  return (
    <div className="w-[74px] h-[74px] rounded-full flex items-center border-gray-300 border-2 text-white overflow-hidden">
      <Image
        className="object-cover"
        alt={`${name}  icon picture`}
        src={picture}
        loading="lazy"
        decoding="async"
        width="70"
        height="70"
      />
    </div>
  )
}

export default UserPicture
