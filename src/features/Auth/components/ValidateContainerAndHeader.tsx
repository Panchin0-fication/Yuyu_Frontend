import { type ReactNode } from "react";
type props = { children: ReactNode; title: string };
export default function ValidateContainerAndHeader({ children, title }: props) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-4 rounded-lg w-[85vw] lg:w-160">
        <header className="flex items-center text-3xl lg:text-5xl font-medium mb-1.5">
          <h2>{title}</h2>
          <img
            className="h-10 w-auto ml-auto"
            src="/staticImgs/generalUse/Yuyukokkuri.png"
            alt=""
          />
        </header>
        <hr />
        <div className="grid place-items-center">{children}</div>
      </div>
    </div>
  );
}
