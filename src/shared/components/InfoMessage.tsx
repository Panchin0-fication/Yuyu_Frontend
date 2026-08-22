//Message to display when is secesary to show extra information
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
type props = {
  header: string;
  onCancel: () => void;
  onContinue: () => void;
  children: ReactNode;
};
export default function InfoMessage({
  header,
  onCancel,
  onContinue,
  children,
}: props) {
  const { t } = useTranslation("common");
  const INFO_MESSAGE =
    "z-10 justify-self-center fixed translate-y-[20vh] left-0 right-0 top-0 bottom-0 bg-white border-[3px] border-gray-100 rounded-2xl py-2.5 px-11.25 w-125 h-max flex gap-2.5 flex-col";
  const INFO_VARIOUS =
    "[&_p]:text-lg [&_h2]:text-2xl [&_span]:text-lg [&_span]:text-black [&_ol]:pl-5 [&_ol]:text-lg [&_ul]:pl-5 [&_ul]:text-lg [&_ol]:list-disc [&_li]:list-item";
  const INFO_HEADER =
    "[&_header]:flex [&_header]:items-center [&_header]:pl-6 [&_header]:text-xl [&_header]:justify-center [&_header]:gap-12.5";
  const INFO_BUTTON =
    "[&_button]:bg-white [&_button]:cursor-pointer [&_button]:p-1.25 [&_button]:border-2 [&_button]:border-black [&_button]:text-lg [&_button]:w-max [&_button]:hover:bg-blue-600 [&_button]:hover:text-white [&_button]:hover:border-white";
  return (
    <>
      <div className="bg-black w-full h-full fixed opacity-30 items-center top-0 left-0 z-10"></div>
      <div
        className={`${INFO_MESSAGE} ${INFO_VARIOUS} ${INFO_HEADER} ${INFO_BUTTON}`}
      >
        <header>
          <h1>{header}</h1>
          <img
            className="h-12 w-auto"
            src="/staticImgs/generalUse/Myon.png"
            alt=""
          />
        </header>
        <hr />
        <div className="flex flex-col gap-2.5">{children}</div>

        <div className="flex justify-center gap-12.5 place-items-center mt-auto">
          <button onClick={onCancel}>{t("button_cancel")}</button>
          <button onClick={onContinue}>{t("button_continue")}</button>
        </div>
      </div>
    </>
  );
}
