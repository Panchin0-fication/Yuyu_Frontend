import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
type props = {
  header: String;
  text: String;
  type: "error" | "success";
  setMessage: (value: null | ReactNode) => void;
  toRedirect: string;
  previus?: any;
};

export default function Message({
  header,
  text,
  type,
  setMessage,
  toRedirect = "",
  previus = "/",
}: props) {
  const navigate = useNavigate();
  function onClick(): void {
    navigate(toRedirect, previus);
  }
  const { t } = useTranslation("common");
  const HEADER_H2 = "[&_h2]:text-2xl [&_h2]:text-center";
  const HEADER_P =
    "[&_p]:absolute [&_p]:right-0 [&_p]:-translate-x-5 [&_p]:cursor-pointer";
  return (
    <>
      <div className="after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-[#030000] after:opacity-30 after:z-10"></div>
      <div className="items-center py-2.5 px-5 text-white w-max h-max text-xl fixed top-0 left-0 right-0 bottom-0 m-auto z-20 bg-black animate-myAnimation duration-1000">
        <header
          className={`${"flex justify-center items-center"} ${HEADER_H2} ${HEADER_P}`}
        >
          <h2>{header}</h2>

          {toRedirect === "" && <p onClick={() => setMessage(null)}>X</p>}
        </header>
        <hr></hr>
        <br />
        <div className="flex gap-5 mb-2.5">
          {type === "error" ? (
            <MdErrorOutline className="text-white text-lg" />
          ) : (
            <FaCheck className="text-white text-lg" />
          )}
          <p>{text}</p>
        </div>
        {toRedirect !== "" && (
          <div className="flex justify-center">
            <button
              className="bg-blue-600 p-2.5 rounded-sm mt-2.5"
              onClick={onClick}
            >
              <p className="text-white text-lg">{t("button_continue")}</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
