import { LinkButton } from '../LinkButton/LinkButton';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="mt-5 mb-16 sm:mt-24">
      <div className="flex flex-col items-center sm:flex-row">
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 sm:mr-5 lg:mr-10 mb-6 sm:mb-0">
          <h1 className="text-3xl sm:text-5xl font-bold">
            The people platform—Where interests become friendships
          </h1>
          <p className="mt-5">
            Whatever your interest, from hiking and reading to networking and
            skill sharing, there are thousands of people who share it on Meetup.
            Events are happening every day—sign up to join the fun.
          </p>
          <div className="mt-7">
            <LinkButton href="#">Join Evently</LinkButton>
          </div>
        </div>
        <div>
          <Image
            src="/images/Group.jpg"
            alt="People doing networking"
            width={500}
            height={280}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
