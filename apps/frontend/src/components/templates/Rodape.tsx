interface RodapeProps {
  copyright: string;
}

export default function Rodape(props: RodapeProps) {
  return (
    <div
      className={`flex justify-end bg-gray-200 text-sm text-gray-900 p-2 dark:bg-gray-900 dark:text-white`}
    >
      <span>{props.copyright}</span>
    </div>
  );
}
