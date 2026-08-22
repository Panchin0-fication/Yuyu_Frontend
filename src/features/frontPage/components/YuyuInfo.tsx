import { useTranslation } from "react-i18next";
export default function YuyuInfo() {
  const { t } = useTranslation("home");
  const IMAGE_INFO =
    "bg-[url(/staticImgs/generalUse/yuyuko-saigyouji-cute.gif)] bg-center bg-cover hover:bg-[url(/staticImgs/generalUse/yuyuko-yuyuko-touhou.gif)] w-50 rounded-xl h-125";

  const BODY_TEXT =
    "pt-5 pl-2.5 pr-2.5 text-xl/6 font-medium text-shadow-[-0.5px_-0.5px_0_#000,0.5px_-0.5px_0_#000,-0.5px_0.5px_0_#000,0.5px_0.5px_0_#000]";
  return (
    <div className="grid grid-cols-3 place-items-center mt-3.5 mb-3.5">
      <div className={IMAGE_INFO}></div>
      <div className="bg-[url(/staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_cake_mogo__sample-b690994a170df7ebb68a55b8ab2b23a6.jpg)] bg-center bg-cover h-125 w-150 text-center items-center text-white pt-5 pb-5 pl-7 pr-7 ali flex flex-col">
        <h2 className="text-4xl font-extrabold text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]">
          {t("yuyu_info_header")}
        </h2>
        <p className={BODY_TEXT}>{t("yuyu_info_paragraph1")}</p>
        <p className={BODY_TEXT}>{t("yuyu_info_paragraph1")}</p>
      </div>
      <div className={IMAGE_INFO}></div>
    </div>
  );
}
