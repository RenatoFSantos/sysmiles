interface BotaoProps {
    cor?: 'green' | 'cyan' | 'gray';
    type: 'form' | 'button';
    className?: string;
    children: any;
    onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
    return (
        <button
            className={`bg-white border-2 cursor-pointer border-cyan-800 text-cyan-800 hover:bg-cyan-800 hover:text-cyan-100 px-4 py-2 rounded-md ${props.className}`}
            type={props.type === 'form' ? 'submit' : 'button'}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
