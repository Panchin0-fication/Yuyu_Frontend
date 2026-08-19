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
          <ul className="w-max">
            <h3>Contenido</h3>
            <li className="translate-x-5 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#silent">1-Silent Sinner in Blue</a>
            </li>
            <li className="translate-x-5 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#foul">2-Foul Detective Satori</a>
            </li>
            <li className="translate-x-5 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#oriental">3-Oriental Sacred Place</a>
            </li>
            <li className="translate-x-5 text-blue-500 hover:border-b-2 border-blue-500 w-max">
              <a href="#visionary">4-Visionary Fairies in Shrine</a>
            </li>
          </ul>
        </ContentTable>
        <TextContainer className="h-full mt-0">
          <h1>Mangas oficiales</h1>
          <p>
            texto explicando como esta organizados los mangas Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Accusantium, beatae
            voluptates! Sapiente illum nisi unde placeat nemo odio rerum autem
            amet? Provident ratione aliquam laborum possimus, nihil unde iusto
            hic.
          </p>
        </TextContainer>
      </div>

      <TitleSprites
        id="silent"
        title={"Silent Sinner in Blue"}
        info="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
        credits="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
      ></TitleSprites>

      <MangaBrowser name="silent sinner in blue" />

      <TitleSprites
        id="foul"
        title={"Foul Detective Satori"}
        info="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
        credits="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
      ></TitleSprites>

      <MangaBrowser name="foul detective satori" />

      <TitleSprites
        id="oriental"
        title={"Oriental Sacred Place"}
        info="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
        credits="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
      ></TitleSprites>

      <MangaBrowser name="oriental sacred place" />

      <TitleSprites
        id="visionary"
        title={"Visionary Fairies in Shrine"}
        info="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
        credits="Lorem ipsum
                    dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
                    voluptates! Sapiente illum nisi unde placeat"
      ></TitleSprites>

      <MangaBrowser name="visionary fairies in shrine" />
    </div>
  );
}
