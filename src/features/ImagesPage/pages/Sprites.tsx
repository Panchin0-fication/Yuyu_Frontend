import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeaderPages,
  ContentTable,
  TextContainer,
  type endingSprite,
} from "@shared";
import { TitleSprites, ImageSpoiler, Sprite } from "@features";
import { MdKeyboardArrowUp } from "react-icons/md";
export default function Sprites() {
  const { t } = useTranslation("images");
  const [endings, setEndings] = useState<endingSprite[]>([
    { hidden: true, id: "ending1" },
    { hidden: true, id: "ending2" },
    { hidden: true, id: "ending3" },
    { hidden: true, id: "ending4" },
    { hidden: true, id: "ending5" },
    { hidden: true, id: "ending6" },
    { hidden: true, id: "ending7" },
    { hidden: true, id: "ending8" },
    { hidden: true, id: "ending9" },
    { hidden: true, id: "ending10" },
    { hidden: true, id: "ending11" },
    { hidden: true, id: "ending12" },
  ]);

  return (
    <div>
      <header id="inicio">
        <HeaderPages
          image="staticImgs/generalUse/mllieuuslnwa1.gif"
          isInPage={true}
          header={t("header_sprites")}
        ></HeaderPages>
        <a href="#inicio" className="flecha-inicio">
          <MdKeyboardArrowUp className="fixed transform translate-y-[-16vh] ml-[95vw] w-10 h-12.5 text-black" />
        </a>
      </header>
      <br />
      <div className="w-[95%] mx-auto">
        <div className="grid grid-cols-[1fr_5fr] gap-10">
          <ContentTable className="flex flex-col">
            <h3>{t("header_content_table")}</h3>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#gameplay"
            >
              {t("option_content_table_gameplay")}
            </a>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#seleccion"
            >
              {t("option_content_table_character_selection")}
            </a>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#dialogos"
            >
              {t("option_content_table_dialogues")}
            </a>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#finales"
            >
              {t("option_content_table_endings")}
            </a>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#fondos"
            >
              {t("option_content_table_backgrounds")}
            </a>
            <a
              className="text-blue-500 pl-1.5 hover:border-b-2 border-blue-500 w-max"
              href="#otros"
            >
              {t("option_content_table_other")}
            </a>
          </ContentTable>
          <TextContainer>
            <h1>{t("header_section_general_informarion")}</h1>
            <p>{t("body_section_general_informarion")}</p>
          </TextContainer>
        </div>
        <TitleSprites
          id="gameplay"
          title={t("header_gameplay_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
        ></TitleSprites>
        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <Sprite
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            src="staticImgs/generalUse/Sprites-touhou7-enemigos-EDIT.png"
          />
          <Sprite
            info="Touhou (8) Eiyashou  ~ Imperishable Night"
            src="staticImgs/generalUse/Sprites-touhou8-juagable-EDIT.png"
          />
          <Sprite
            info="Touhou (10.5) Hisouten ~ Scarlet Weather Rhapsody | Touhou (12.3) Hisoutensoku ~  Choudokyuu Ginyoru no Nazo o Oe"
            src="staticImgs/generalUse/Sprites-touhou10.5-juego-EDIT.png"
          />
        </div>

        <TitleSprites
          id="seleccion"
          title={t("header_character_selection_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
        ></TitleSprites>
        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <Sprite
            info="Touhou (8) Eiyashou  ~ Imperishable Night"
            src="staticImgs/generalUse/Sprites-touhou8-seleccion-EDIT1.png"
          />
          <Sprite
            info="Touhou (10.5) Hisouten ~ Scarlet Weather Rhapsody"
            src="staticImgs/generalUse/Sprites-touhou10.5-seleccion-EDIT2.png"
          />
          <Sprite
            info="Touhou (10.5) Hisouten ~ Scarlet Weather Rhapsody"
            src="staticImgs/generalUse/Sprites-touhou10.5-seleccion-EDIT1.png"
          />
        </div>

        <TitleSprites
          id="dialogos"
          title={t("header_dialogues_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
        />
        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <Sprite
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            src="staticImgs/generalUse/Sprites-touhou7-portadas-EDIT.png"
          />
          <Sprite
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            src="staticImgs/generalUse/Sprites-touhou8-dialogos-EDIT.png"
          />
          <Sprite
            info="Touhou (10.5) Hisouten ~ Scarlet Weather Rhapsody | Touhou (12.3) Hisoutensoku ~  Choudokyuu Ginyoru no Nazo o Oe"
            src="staticImgs/generalUse/Sprites.touhou10.5-portadas.png"
          />
          <Sprite
            info="Touhou (13) Shinreibyoun ~ Ten Desires"
            src="staticImgs/generalUse/Sprites-touhou13-dialogos-EDIT.png"
          />
        </div>

        <TitleSprites
          id="finales"
          title={t("header_endings_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          endings={endings}
          setEndings={setEndings}
        />

        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT1.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[0]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT2.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[1]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT3.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[2]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT4.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[3]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT5.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[4]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT6.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[5]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT7.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[6]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-touhou7-finales-EDIT8.png"
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            endings={endings}
            setEndings={setEndings}
            ending={endings[7]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-Touhou8-finales-EDIT1.png"
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            endings={endings}
            setEndings={setEndings}
            ending={endings[8]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-Touhou8-finales-EDIT2.png"
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            endings={endings}
            setEndings={setEndings}
            ending={endings[9]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-Touhou8-finales-EDIT3.png"
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            endings={endings}
            setEndings={setEndings}
            ending={endings[10]}
          />
          <ImageSpoiler
            src="staticImgs/generalUse/Sprites-Touhou8-finales-EDIT4.png"
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            endings={endings}
            setEndings={setEndings}
            ending={endings[11]}
          />
        </div>

        <TitleSprites
          id="fondos"
          title={t("header_backgrounds_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
        />
        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <Sprite
            info="Touhou (7) Youyoumu ~ Perfect Cherry Blossom"
            src="staticImgs/generalUse/Sprites-touhou7-fondos-EDIT.png"
          />
          <Sprite
            info="Touhou (10.5) Hisouten ~ Scarlet Weather Rhapsody"
            src="staticImgs/generalUse/Sprites-touhou10.5-fondo.png"
          />
          <Sprite
            info="Touhou (12.3) Hisoutensoku ~  Choudokyuu Ginyoru no Nazo o Oe"
            src="staticImgs/generalUse/Sprites-touhou12.3-fondo.png"
          />
          <Sprite
            info="Touhou (13) Shinreibyoun ~ Ten Desires"
            src="staticImgs/generalUse/Th13Netherworld.jpg"
          />
        </div>

        <TitleSprites
          id="otros"
          title={t("header_others_info")}
          info="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
          credits="Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Accusantium, beatae
              voluptates! Sapiente illum nisi unde placeat"
        />
        <div className="mt-5 ml-5 flex flex-row justify-start flex-wrap gap-2.5 [&>img]:self-start">
          <Sprite
            info="Touhou (8) Eiyashou ~ Imperishable Night"
            src="staticImgs/generalUse/Sprites-touhou8-loading-EDIT.png"
          />
          <Sprite
            info="Touhou  Shinkirou ~ Hopeless Masquerade"
            src="staticImgs/generalUse/sprites-touhou13.5-defondo-EDIT.png"
          />
          <Sprite
            info="Touhou Hisouten ~ Scarlet Weather Rhapsody"
            src="staticImgs/generalUse/Sprites-touhou10.5-efectos.png"
          />
        </div>
      </div>
    </div>
  );
}
