import { type ReactNode } from "react";
type props = {
  className?: string | null;
  children: ReactNode;
};
const CONTAINER =
  "font-ibm font-normal py-2.5 px-4 bg-white rounded-xl overflow-hidden border-4 border-pink-500";
const CONTAINER_H1 =
  "[&_h1]:p-2.5 [&_h1]:text-2xl [&_h1]:font-normal [&_h1]:border-b-2 [&_h1]:border-black";
const CONTAINER_H2 = "[&_h2]:pt-5 [&_h2]:text-xl [&_h2]:font-medium";
const CONTAINER_P = "[&_p]:text-justify [&_p]:leading-6";
export default function TextContainer({ className, children = null }: props) {
  return (
    <div
      className={`${CONTAINER} ${CONTAINER_H1} ${CONTAINER_H2} ${CONTAINER_P} ${""} ${className}`}
    >
      {children}
    </div>
  );
}
