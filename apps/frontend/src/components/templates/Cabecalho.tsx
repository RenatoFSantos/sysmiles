import { User } from 'next-auth';
import AvatarUsuario from './AvatarUsuario';
import Titulo from './Titulo';

interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
}

export default function Cabecalho(props: CabecalhoProps) {
    return (
        <div className={`flex justify-between items-center p-2 bg-slate-200`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <AvatarUsuario src={'/photo_default.jpg'} />
        </div>
    );
}
