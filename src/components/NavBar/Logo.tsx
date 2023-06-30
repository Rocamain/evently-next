import Image from 'next/image';
export default function Logo() {
  return (
    <Image
      src="/images/Logo.png"
      alt="Evently logo"
      width={150}
      height={70}
      priority={true}
    />
  );
}
