import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from '@/components/Icons'

const DropFileZone = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader()

    file.onload = function () {
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      {preview && <p className="mb-5"></p>}
      <div {...getRootProps()}>
        <input type="file" accept="image/*" {...getInputProps()} />
        <div className="w-[74px] h-[74px] rounded-full flex items-center bg-red-500 border-gray-300 border-2 text-white hover:bg-red-300 overflow-hidden">
          {isDragActive ? (
            'Adding picture'
          ) : preview ? (
            <Image
              src={preview as string}
              alt="Upload preview"
              className="w-[100%] h-[100%] rounded-full shadow-lg object-cover"
              width="60"
              height="60"
            />
          ) : (
            <Upload />
          )}
        </div>
      </div>
    </div>
  )
}

export default DropFileZone
