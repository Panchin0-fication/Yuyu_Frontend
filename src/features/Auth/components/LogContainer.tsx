import { type ReactNode } from "react";
export default function LogContainer({ children }: { children: ReactNode }) {
  return (
    <div>
      <div
        className={
          "flex flex-col p-5 bg-white rounded-xl border-2 border-white  m-auto w-96"
        }
      >
        {children}
      </div>
    </div>
  );
}
