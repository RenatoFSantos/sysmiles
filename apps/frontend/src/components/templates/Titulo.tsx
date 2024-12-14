import Logo from './logo';

interface TituloProps {
    titulo: string;
    subtitulo: string;
}

export default function Titulo(props: TituloProps) {
    return (
        <div className="flex items-center">
            <Logo image="/dentalpix_180x31px.png" />
            <div className="flex flex-col ml-5">
                <h1 className={`font-black text-3xl text-gray-900 dark:text-gray-300`}>
                    {props.titulo}
                </h1>
                <h2 className={`font-light text-sm text-gray-600 dark:text-gray-50`}>
                    {props.subtitulo}
                </h2>
            </div>
        </div>
    );
}
