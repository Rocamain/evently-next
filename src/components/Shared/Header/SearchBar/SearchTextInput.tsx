import { GreyMagnifier } from '@/components/Icons'
interface TextInputProps {
  isSmallScreen?: boolean
}

export default function SearchTextInput({
  isSmallScreen = false,
}: TextInputProps) {
  const inputClassName =
    (isSmallScreen ? `pl-4 rounded-tl-lg ` : `pl-9 rounded-l-lg `) +
    'appearance-none border p-2 border-gray-300 outline-none hover:border-gray-300 focus:border-gray-400 hover:z-10 focus:z-10 lg:min-w-[120px] xl:min-w-[300px] border-gray-300 outline-none hover:border-gray-300 focus:border-red-300 hover:z-10 focus:z-10 lg:min-w-[120px] xl:min-w-[300px] flex-grow w-full rounded-r-none placeholder:text-gray-400'

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className={`hidden lg:block lg:relative lg:left-7`}>
        <GreyMagnifier />
      </div>
      <div className="w-full">
        <input
          name="searchText"
          type="text"
          placeholder="Search for events"
          className={inputClassName}
        />
      </div>
    </div>
  )
}
