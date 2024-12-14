interface ErrorMsgProps {
    msg: string;
}

export default function ErrorMsg({ msg }: ErrorMsgProps) {
    return <span className="ml-3 text-sm font-mono text-red-500">{msg}</span>;
}
