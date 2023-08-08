import Hero from '@/components/Home/Hero/Hero';
import EventSHome from '@/components/Home/EventsHome/EventsHome';

export default function Home() {
  return (
    <main className="flex flex-col items-center flex-grow relative">
      <div className="px-4 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full">
        <Hero />
        <EventSHome />
      </div>
    </main>
  );
}
