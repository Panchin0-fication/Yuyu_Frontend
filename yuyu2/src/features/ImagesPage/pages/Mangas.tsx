import { useTranslation } from "react-i18next";
import { HeaderPages, ContentTable, TextContainer } from "@shared";
import { TitleSprites, MangaBrowser } from "@features";
import styles from "./css/Mangas.module.css";

export default function Mangas() {
  const { t } = useTranslation("images");
  return (
    <div className={styles.container}>
      <HeaderPages
        image="staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_dounaga_nuko__sample-2fd9d01a7877ab582bb7da7d425263dd.jpg"
        isInPage={true}
        header={t("header_fanarts")}
      />
      <div className="barra"></div>
      <div className={styles.paragraph1}>
        <ContentTable className={styles.index}>
          <ul>
            <h3>Contenido</h3>
            <li>
              <a href="#silent">1-Silent Sinner in Blue</a>
            </li>
            <li>
              <a href="#foul">2-Foul Detective Satori</a>
            </li>
            <li>
              <a href="#oriental">3-Oriental Sacred Place</a>
            </li>
            <li>
              <a href="#visionary">4-Visionary Fairies in Shrine</a>
            </li>
          </ul>
        </ContentTable>
        <TextContainer className={styles.paragraphContainer}>
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
