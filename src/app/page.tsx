import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center flex-grow relative overflow-hidden">
        <div className="px-6 sm:px-4 xl:px-0 md:max-w-5xl lg:max-w-6xl w-full">
          <Hero />
        </div>
        <div>Events</div>
      </main>
      <footer></footer>
    </>
  );
}
