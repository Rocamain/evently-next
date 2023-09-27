import Image from 'next/image'
import { Avatar } from '@/components/Icons'

interface ProfilePictureProps {
  picture?: string | null
  loading: boolean
}

export default function ProfilePicture({
  picture,
  loading,
}: ProfilePictureProps) {
  return (
    <div className="w-[74px] h-[74px] rounded-full flex items-center bg-red-500 border-gray-300 border-2 text-white overflow-hidden">
      {loading && (
        // Render a spinner while loading
        <div className="w-[60px] h-[60px] mx-auto border-t-4 border-white border-solid rounded-full animate-spin"></div>
      )}
      {!loading && picture && (
        <Image
          src={picture}
          alt="Upload preview"
          className="w-[100%] h-[100%] rounded-full shadow-lg object-cover"
          width="60"
          height="60"
        />
      )}
      {!loading && !picture && <Avatar />}
    </div>
  )
}
