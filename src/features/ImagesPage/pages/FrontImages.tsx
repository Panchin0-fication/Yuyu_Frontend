import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeaderPages, NavSecondary } from "@shared";

export default function FrontImages() {
  const { t } = useTranslation("images");
  const [over, setOver] = useState<"sprites" | "mangas" | "fanArts" | "">("");
  const navigate = useNavigate();
  function handleMouseOver(option: "sprites" | "mangas" | "fanArts"): void {
    setOver(option);
  }
  function handleMouseOut(): void {
    setOver("");
  }
  function handleClick(option: "sprites" | "mangas" | "fanArts") {
    navigate(`/${option}`);
  }
  return (
    <div>
      <HeaderPages
        image="/staticImgs/generalUse/yuyuko-touhou.gif"
        header={t("header_front")}
      />
      <NavSecondary actualPage="images" classNameExtra="w-[95%] mx-auto" />
      <div className="grid grid-cols-3 gap-12.5 justify-center pt-3.75 pb-12.5 w-[95%] mx-auto">
        <button
          onMouseOverCapture={(): void => handleMouseOver("sprites")}
          onMouseOut={handleMouseOut}
          className="justify-self-center border-none bg-transparent group relative cursor-pointer hover:after:absolute after:content-[''] hover:after:top-0 after:left-0 hover:after:w-full hover:after:h-full hover:after:bg-[#030000] hover:after:opacity-30 hover:after:z-10"
          onClick={(): void => handleClick("sprites")}
        >
          <img
            src="/staticImgs/generalUse/Portada1.jpg"
            alt=""
            className="h-125 w-80"
          />
          {over === "sprites" && (
            <p className="absolute text-xl/6 p-3 text-white w-[320px] z-20 cursor-pointer top-12.5 left-0 pointer-events-none">
              {t("sprites_page_info")}
            </p>
          )}
          <p className="text-[23px]">{t("sprites_page_header")}</p>
        </button>
        <button
          className="justify-self-center border-none bg-transparent group relative cursor-pointer hover:after:absolute after:content-[''] hover:after:top-0 after:left-0 hover:after:w-full hover:after:h-full hover:after:bg-[#030000] hover:after:opacity-30 hover:after:z-10"
          onMouseOverCapture={(): void => handleMouseOver("mangas")}
          onMouseOut={handleMouseOut}
          onClick={(): void => handleClick("mangas")}
        >
          <img
            src="/staticImgs/generalUse/pmiss_yuyuko.jpg"
            alt=""
            className="h-125 w-80"
          />
          {over === "mangas" && (
            <p className="absolute text-xl/6 p-3 text-white w-80 z-20 cursor-pointer top-12.5 left-0 pointer-events-none">
              {t("mangas_page_info")}
            </p>
          )}
          <p className="text-[23px]">{t("mangas_page_header")}</p>
        </button>
        <button
          className="justify-self-center border-none bg-transparent group relative cursor-pointer hover:after:absolute after:content-[''] hover:after:top-0 after:left-0 hover:after:w-full hover:after:h-full hover:after:bg-[#030000] hover:after:opacity-30 hover:after:z-10"
          onMouseOverCapture={(): void => handleMouseOver("fanArts")}
          onMouseOut={handleMouseOut}
          onClick={(): void => handleClick("fanArts")}
        >
          <img
            src="/staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_r9nr9__d922a533458f7883c6d88ffd21299284.jpg"
            alt=""
            className="h-125 w-80"
          />
          {over === "fanArts" && (
            <p className="absolute text-xl/6 p-3 text-white w-[320px] z-20 cursor-pointer top-12.5 left-0 pointer-events-none">
              {t("fanarts_page_info")}
            </p>
          )}
          <p className="text-2xl">{t("fanarts_page_header")}</p>
        </button>
      </div>
    </div>
  );
}
