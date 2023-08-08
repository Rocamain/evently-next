'use client';
import { useState, useEffect, useRef } from 'react';
import ChevronBtn from './ChevronBtn';
import ChevronBtnLeft from './ChevronBtnLeft';
import { LinkButton } from '@/components/Shared/LinkButton/LinkButton';
import CardOnline from './CardOnline';
const ONLINE_EVENTS = [
  {
    dateTime: ['25/07/2023', '11:00'],
    title: 'The Healing Clinic',
    link: '',
    photo: '/images/online/yoann-boyer-i14h2xyPr18-unsplash.jpg',
    users: [
      { name: 'Alba', link: '' },
      { name: 'John Doe', link: '' },
      { name: 'Albert', link: '' },
      { name: 'Lucas Bean', link: '' },
      { name: 'Rory Lee', link: '' },
      { name: 'Charlotte Smith', link: '' },
    ],
  },
  {
    dateTime: ['25/07/2023', '15:00'],
    title: 'Price of Persia',
    link: '',
    photo: '/images/online/zoltan-tasi-5SZP8OTK9wo-unsplash.jpg',
    users: [
      { name: 'Charlotte Smith', link: '' },
      { name: 'Rory Lee', link: '' },
      { name: 'Jamie Stock', link: '' },
    ],
  },
  {
    dateTime: ['28/07/2023', '18:00'],
    title: 'Brew house',
    link: '',
    photo: '/images/online/timothy-dykes-Lq1rOaigDoY-unsplash.jpg',
    users: [
      { name: 'Lucas Bean', link: '' },
      { name: 'Rory Lee', link: '' },
      { name: 'Charlotte Smith', link: '' },
      { name: 'Rory Lee', link: '' },
      { name: 'Jamie Stock', link: '' },
    ],
  },
  {
    dateTime: ['28/07/2023', '18:00'],
    title: 'Spaghetti Code',
    photo: '/images/online/timothy-dykes-Lq1rOaigDoY-unsplash.jpg',
    link: '',
    users: [
      { name: 'Jamie Stock', link: '' },
      { name: 'Lucas Bean', link: '' },
      { name: 'Charlotte Smith', link: '' },
      { name: 'Rory Lee', link: '' },
    ],
  },
  {
    dateTime: ['25/07/2023', '11:00'],
    title: 'The Healing Clinic 2',
    link: '',
    photo: '/images/online/yoann-boyer-i14h2xyPr18-unsplash.jpg',
    users: [
      { name: 'Alba', link: '' },
      { name: 'John Doe', link: '' },
      { name: 'Albert', link: '' },
      { name: 'Lucas Bean', link: '' },
      { name: 'Rory Lee', link: '' },
      { name: 'Charlotte Smith', link: '' },
    ],
  },
];

export default function OnlineEvents() {
  const [slide, setSlide] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [step, setStep] = useState(1);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cardsLength = ONLINE_EVENTS.length;
  }, []);

  const handleClick = (px: number) => {
    const isSlidingRight = px < 0;
    setStep((prev) => {
      console.log({ prev });
      return isSlidingRight ? prev + 1 : prev - 1;
    });
    console.log({ step });
    setSlide((prev) => {
      let total;
      console.log(step);
      if (step === ONLINE_EVENTS.length - Math.floor(width / 274)) {
        console.log('yeah');
        const a = isSlidingRight ? 225 : -225;
        const b = Math.abs(prev) + a;
        console.log({ b, carouselWidth });
        total = isSlidingRight ? -b : b;
      } else {
        const a = isSlidingRight ? 274 : -274;
        const b = Math.abs(prev) + a;
        total = isSlidingRight ? -b : b;
      }

      // const result = prev + px;
      // const total = carouselWidth - Math.abs(result);
      console.log({ carouselWidth, total, width });
      return total;
      // if (total < width) {
      //   const newTotal = total + 250;
      //   return 0;
      // } else {
      //   return total;
      // }
    });
  };

  return (
    <section id="online_events" className="mb-20">
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-semibold text-2xl sm:text-3xl mb-2">
          Next Online Events
        </h3>
        <LinkButton href="" transparent={true} tealText={true}>
          More events
        </LinkButton>
      </div>
      <div className="flex justify-between items-center relative">
        <div ref={ref} className="overflow-hidden">
          <div
            className={`flex gap-6 transition-transform`}
            style={{ transform: `translateX(${slide}px)` }}
          >
            {ONLINE_EVENTS.map((card) => {
              return <CardOnline key={card.title} {...card} />;
            })}
          </div>
        </div>
        <ChevronBtn left clickHandler={handleClick} />
        {<ChevronBtn right clickHandler={handleClick} />}
      </div>
    </section>
  );
}
