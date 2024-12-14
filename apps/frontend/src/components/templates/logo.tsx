import Image from 'next/image';

interface LogoProps {
    image: string;
}

export default function Logo({ image }: LogoProps) {
    return (
        <div>
            <Image src={image} alt="Dentalpix" width={180} height={31} />
        </div>
    );
}
