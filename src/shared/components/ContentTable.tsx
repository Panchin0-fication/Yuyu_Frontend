import { type ReactNode } from "react";
type props = {
  className: string;
  children: ReactNode;
};
export default function ContentTable({ className, children }: props) {
  return (
    <div
      className={`${"bg-white border-4 w-max border-pink-600 p-2.5 rounded-lg [&_a]:font-ibm [&_a]:font-normal [&_a]:text-base [&_a]:pb-1.5 [&_h3]:font-ibm [&_h3]:font-normal [&_h3]:text-2xl"} ${className}`}
    >
      {children}
    </div>
  );
}
