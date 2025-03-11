interface BotaoProps {
    cor?: 'green' | 'cyan' | 'gray';
    type: 'form' | 'button';
    status?: boolean;
    className?: string;
    children: any;
    onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
    return (
        <button
            className={`bg-white border-2 cursor-pointer p-2 rounded-xl ${props.status ? 'border-gray-300 text-gray-300 hover:bg-gray-400 cursor-default' : ' border-cyan-800 text-cyan-800 hover:bg-cyan-800 hover:text-cyan-100 cursor-pointer'} ${props.className}`}
            type={props.type === 'form' ? 'submit' : 'button'}
            onClick={props.onClick}
            disabled={props.status}>
            {props.children}
        </button>
    );
}
