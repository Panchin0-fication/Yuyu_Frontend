type props = {
  src: string;
  text: string;
  classImage?: string;
};
export default function WikiImages({ src, text, classImage }: props) {
  return (
    <div className="font-ibm font-normal mt-5 items-center border-1.75 border-double border-[#db85b0] bg-white h-auto text-xs p-1.25 flex flex-col justify-center">
      <img className={`${classImage} ${"pb-1.75 m-auto"}`} src={src} alt="" />
      <p className="px-1.25">{text}</p>
    </div>
  );
}
