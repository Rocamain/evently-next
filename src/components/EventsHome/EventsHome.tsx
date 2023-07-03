import Card from './Card';
import { LinkButton } from '../LinkButton/LinkButton';

const EVENTS = [
  {
    photo: {
      src: '/images/jed-villejo-bEcC0nyIp2g-unsplash.jpg',
      alt: 'People hiking',
    },
    link: { title: 'Make new friends', href: '#friends' },
  },
  {
    photo: {
      src: '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg',
      alt: 'Couple cooking',
    },
    link: { title: 'Learn new recipes', href: '#cooking' },
  },

  {
    photo: {
      src: '/images/austin-distel-rxpThOwuVgE-unsplash.jpg',
      alt: 'People in a in a tech meeting',
    },
    link: { title: 'Connect over tech', href: '#tech' },
  },
];

const BUTTONS = [
  { title: 'Boost your career', href: '#' },
  { title: 'Cook like chef', href: '#' },
  { title: 'Get fit', href: '#' },
  { title: 'Read with friends', href: '#' },
  { title: 'Language exchange', href: '#' },
  { title: 'Find your zen', href: '#' },
  { title: 'learn JavaScript', href: '#' },
];

const INSTRUCTIONS = {
  header: {
    title: 'How it works Evently',
    text: 'Meet new people who share your interests through online and in-person events. It’s free to create an account.',
  },
  cards: [
    {
      icon: '',
      title: 'Find an event',
      text: 'Find the event according our interests and your location, you will find what your are looking for!',
    },
    {
      icon: '',
      title: 'Book an event',
      text: 'There are thousands of events, and with just two click you will be able to join and discover amazing people',
    },
    {
      icon: '',
      title: 'Create it',
      text: 'You can also create your own event and create a community with your interests',
    },
  ],
};

export default function Event() {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        {EVENTS.map((event) => (
          <Card key={event.link.title} {...event} />
        ))}
      </section>
      <section className="md:h-auto w-full flex flex-wrap py-8 lg:mx-0 md: overflow-x-auto  md:w-auto">
        <div className="flex flex-wrap gap-x-2 gap-y-3 md:flex-nowrap sm:px-2 md:px-4">
          {BUTTONS.map((button) => (
            <div key={button.title} className="flex items-center">
              <LinkButton href={button.href} circular={true}>
                {button.title}
              </LinkButton>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
