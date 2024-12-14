import Link from 'next/link';

interface MenuItemProps {
    texto?: string;
    icone: any;
    url?: string;
    className?: string;
    onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
    return (
        <li
            onClick={props.onClick}
            className={`hover:bg-gray-300 hover:text-slate-700 dark:hover:text-black dark:hover:bg-gray-300 cursor-pointer p-3 mx-2 mt-1 mb-1 rounded-xl`}>
            <Link className={`flex justify-left items-center ${props.className}`} href={props.url}>
                {props.icone}
                {props.texto
                    ? props.texto && (
                          <span className={`ml-2 font-light text-white-600 w-[200px]`}>
                              {props.texto}
                          </span>
                      )
                    : props.texto}
            </Link>
        </li>
    );
}
