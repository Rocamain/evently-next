import Link from 'next/link';
import Image from 'next/image';

async function getData(id: string) {
  const res = await fetch(`http://localhost:4000/item/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function events({ params }: { params: { id: string } }) {
  const { data } = await getData(params.id);
  const { eventOwnerName, eventTitle, eventDescription, eventLink } = data;
  const descriptionParagraphs = eventDescription.split('\n');
  console.log(descriptionParagraphs);
  console.log({ data });
  return (
    <div className="relative">
      <div className="relative z-10 px-5 w-full border-b border-shadowColor py-2 lg:py-6">
        <div className="md:max-w-screen mx-auto">
          <h3
            id="event-title"
            className="overflow-ellipsis overflow-hidden text-3xl font-bold"
          >
            {eventTitle}
          </h3>
          <Link href="#" className="flex flex-row mt-4 lg:mt-5">
            <div>
              <Image
                src="/images/Logo.png"
                alt="Evently logo"
                width={48}
                height={48}
                priority={false}
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p> Hosted by</p>
              <p className="font-bold"> {eventOwnerName}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="px-5 py-5 relative-z-10 bg-gray-100/80 w-full flex flex-col items-center justify-between lg:px-5 border-t border-gray-200 pb-6">
        <div className="md:max-w-screen w-full ">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="py-4 md:max-w-screen w-full">
              <h4 className="text-xl font-bold mb-5">Details</h4>
              {descriptionParagraphs.map((p: string, index: string) => (
                <p key={'description-' + index} className="mb-3">
                  {p}
                </p>
              ))}

              <Link href={eventLink}>
                <p>Link</p>
              </Link>
            </div>
            <div className="">Right</div>
          </div>
        </div>
      </div>
    </div>
  );
}
