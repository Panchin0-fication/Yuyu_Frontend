import { useTranslation } from "react-i18next";
import { HeaderPages, ContentTable, TextContainer } from "@shared";
import { TitleSprites, MangaBrowser } from "@features";

export default function Mangas() {
  const { t } = useTranslation("images");
  return (
    <div className="w-[95%] mx-auto">
      <HeaderPages
        image="staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_dounaga_nuko__sample-2fd9d01a7877ab582bb7da7d425263dd.jpg"
        isInPage={true}
        header={t("header_fanarts")}
      />
      <div className="barra"></div>
      <div className="pt-5 grid grid-cols-[1fr_5fr] items-center gap-10">
        <ContentTable className="flex flex-col ">
          <ul className="w-max flex flex-col gap-1.5">
            <h3>{t("index_header")}</h3>
            <li className="pl-4 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#silent">1-Silent Sinner in Blue</a>
            </li>
            <li className="pl-4 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#foul">2-Foul Detective Satori</a>
            </li>
            <li className="pl-4 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#strange">3-Strange and Bright Nature Deity</a>
            </li>
            <li className="pl-4 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#oriental">4-Oriental Sacred Place</a>
            </li>
            <li className="pl-4 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#visionary">5-Visionary Fairies in Shrine</a>
            </li>
            
          </ul>
        </ContentTable>
        <TextContainer className="h-full mt-0 text-">
          <h1>{t("general_info_header")}</h1>
          <p className="text-lg pt-2">{t("general_info_p")}</p>
        </TextContainer>
      </div>

      <TitleSprites
        id="silent"
        title={"Silent Sinner in Blue"}
        info={t("silent_info")}
        credits={t("silent_credits")}
      ></TitleSprites>

      <MangaBrowser name="silent sinner in blue" />

      <TitleSprites
        id="foul"
        title={"Foul Detective Satori"}
        info={t("foul_info")}
        credits={t("foul_credits")}
      ></TitleSprites>

      <MangaBrowser name="foul detective satori" />

      <TitleSprites
        id="strange"
        title={"Strange and Bright Nature Deity"}
        info={t("strange_info")}
        credits={t("strange_credits")}
      ></TitleSprites>

      <MangaBrowser name="strange and bright nature deity" />

      <TitleSprites
        id="oriental"
        title={"Oriental Sacred Place"}
        info={t("oriental_info")}
        credits={t("oriental_credits")}
      ></TitleSprites>

      <MangaBrowser name="oriental sacred place" />

      <TitleSprites
        id="visionary"
        title={"Visionary Fairies in Shrine"}
        info={t("visionary_info")}
        credits={t("visionary_credits")}
      ></TitleSprites>

      <MangaBrowser name="visionary fairies in shrine" />
    </div>
  );
}
