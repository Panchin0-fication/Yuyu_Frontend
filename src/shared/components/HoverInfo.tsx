type props = {
  hover: boolean;
  info: string;
};
export default function HoverInfo({ hover, info }: props) {
  return (
    <span
      className={`${"bg-black text-white p-1.75 rouned-sm absolute translate-y-8.75 "} ${hover ? "block" : "hidden"}`}
    >
      {info}
    </span>
  );
}
