import { useTranslation } from "react-i18next";
export default function InfoWebPage() {
  const { t } = useTranslation("home");
  const SECTION =
    "w-80 group h-100 rounded-lg bg-white p-2.5 [box-shadow:6px_6px_5px_#69abd2] transition-shadow duration-500 hover:[box-shadow:6px_6px_5px_#980e53]";
  const SECTION_H1 =
    "text-4xl group-hover:text-pink-700 text-[#69abd2] transition-colors duration-500 text-shadow-[-0.5px_-0.5px_0_#ffffff,0.5px_-0.5px_0_#ffffff,-0.5px_0.5px_0_#ffffff,0.5px_0.5px_0_#ffffff]";
  const SECTION_P =
    "text-xl/6 lg:text-2xl text-white mt-2.5 font-normal text-shadow-[-0.5px_-0.5px_0_#000,0.5px_-0.5px_0_#000,-0.5px_0.5px_0_#000,0.5px_0.5px_0_#000] lg:text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]";
  return (
    <>
      <div className="bg-white h-max border-4 border-pink-700 flex items-center rounded-md w-11/12 m-auto">
        <img
          className="h-26 w-auto"
          src="/staticImgs/generalUse/yuyuko-yuyuko-saigyouji.gif"
          alt=""
        />
        <p className="text-xl">{t("page_info")}</p>
      </div>
      <div className={"flex gap-7 lg:gap-20 flex-wrap justify-center mt-5 mb-5"}>
        <div
          className={`${SECTION} ${"bg-[url(/staticImgs/generalUse/Hola.jpg)] bg-center bg-cover"}`}
        >
          <h1 className={SECTION_H1}>{t("section_information_header")}</h1>
          <p className={SECTION_P}>{t("section_information_text")}</p>
        </div>
        <div
          className={`${SECTION} ${"bg-[url(/staticImgs/generalUse/Hola2.png)] bg-center bg-cover"}`}
        >
          <h1 className={SECTION_H1}>{t("section_images_header")}</h1>
          <p className={SECTION_P}>{t("section_images_text")}</p>
        </div>
        <div
          className={`${SECTION} ${"bg-[url(/staticImgs/generalUse/Hola3.png)] bg-center bg-cover"}`}
        >
          <h1 className={SECTION_H1}>{t("section_extra_header")}</h1>
          <p className={SECTION_P}>{t("section_extra_text")}</p>
        </div>
      </div>
    </>
  );
}
