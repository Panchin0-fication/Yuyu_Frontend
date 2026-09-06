export default function LogHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center mb-2.5">
      <h1 className="text-4xl lg:text-5xl">{title}</h1>
      <img
        className="ml-auto h-11 w-11"
        src="/staticImgs/generalUse/Yuyukokkuri.png"
        alt=""
      />
    </header>
  );
}
