type props = {
  src: string;
  info: string;
};
export default function Sprite({ src, info }: props) {
  return (
    <div className="flex flex-col items-center justify-center h-max border-2 border-pink-700 p-2">
      <img src={src} alt="" />
      <p>{info}</p>
    </div>
  );
}
