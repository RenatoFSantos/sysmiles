interface ConteudoProps {
    children?: any;
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className="flex mt-3 w-full text-gray-700 dark:text-gray-200">{props.children}</div>
    );
}
