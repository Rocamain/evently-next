import Image from 'next/image';
import { LinkButton } from '../../Shared/LinkButton/LinkButton';
interface INSTRUCTIONS_CARDS {
  title: string;
  link: string;
  text: string;
  icon: string;
}

function CardInstructions(props: INSTRUCTIONS_CARDS) {
  const { title, text, icon, link } = props;
  return (
    <div className="flex flex-col sm:w-1/3 items-center space-y-2 px-6 p1ym4qhs">
      <Image src={icon} alt="icon" width={150} height={160} />
      <div className="text-center">
        <div className="mb-3">
          <LinkButton
            href={link}
            tealText={true}
            transparent={true}
            bigText={true}
          >
            {title}
          </LinkButton>
        </div>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
}

export default CardInstructions;
