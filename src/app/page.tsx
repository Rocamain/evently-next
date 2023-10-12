import Hero from '@/components/Home/Hero/Hero'
import EventSHome from '@/components/Home/EventsHome/EventsHome'

export default function Home() {
  return (
    <div className="flex flex-col items-center relative">
      <div className="px-4 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full">
        <Hero />
        <EventSHome />
      </div>
    </div>
  )
}
