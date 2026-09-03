import { useTranslation } from "react-i18next";
import {
  HeaderPages,
  NavSecondary,
  ContentTable,
  TextContainer,
  ImagesWiki,
} from "@shared";
export default function Oficial() {
  const { t } = useTranslation("wikis");
  return (
    <div className="flex flex-col pb-5">
      <HeaderPages
        image="/staticImgs/generalUse/touhou-saigyouji-yuyuko.gif"
        header={t("header_official")}
      />

      <div className="w-[95%] m-auto">
        <NavSecondary actualPage="oficial" />

        <div className="flex gap-10 items-center pt-4">
          <ContentTable className="flex flex-col gap-1 w-60">
            <h3 className="titulo">{t("official_index_header")}</h3>

            <a
              className="text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion1"
            >
              {t("official_index_general_info")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion1.1"
            >
              {t("official_index_design")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion1.2"
            >
              {t("official_index_abilities")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion1.3"
            >
              {t("official_index_personality")}
            </a>
            <a
              className="text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion2"
            >
              {t("official_index_lore")}
            </a>
            <a
              className="text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion3"
            >
              {t("official_index_appearances")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion3.1"
            >
              {t("official_index_games")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion3.2"
            >
              {t("official_index_literature")}
            </a>
            <a
              className="text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion4"
            >
              {t("official_index_relationships")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion4.1"
            >
              {t("official_index_youmu")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion4.2"
            >
              {t("official_index_yukari")}
            </a>
            <a
              className="ml-3.75 text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion4.2"
            >
              {t("official_index_eiki")}
            </a>
            <a
              className="text-blue-500 hover:border-b-2 border-b-blue-500"
              href="#seccion5"
            >
              {t("official_index_highlights")}
            </a>
          </ContentTable>
          <TextContainer className="h-max w-[65%]">
            <h1 id="seccion1">{t("official_info_general_info_header")}</h1>
            <h2 id="seccion1.1">{t("official_info_design_header")}</h2>
            <p>
              {t("official_info_design_p")}
            </p>
            <h2 id="seccion1.2">{t("official_info_abilities_header")}</h2>
            <p>
              {t("official_info_abilities_p")}
            </p>
            <h2 id="seccion1.3">{t("official_info_personality_header")}</h2>
            <p>
              {t("official_info_personality_p")}
            </p>
          </TextContainer>
          <ImagesWiki
            src="/staticImgs/generalUse/200px-Th07Yuyuko.png"
            text={t("yuyuko_sprite_th7")}
          ></ImagesWiki>
        </div>
        <div className="flex gap-11.75">
          <ImagesWiki
            src="/staticImgs/generalUse/Th07ayakashi01.png"
            text={t("ayakashi_sprite_th7")}
            classImage="h-50 w-auto"
          ></ImagesWiki>

          <TextContainer className={"w-[85%]"}>
            <h1 id="seccion2">{t("official_info_lore_header")}</h1>
            <p>
              {t("official_info_lore_p")}
            </p>
          </TextContainer>
        </div>
        <div className="flex gap-10">
          <TextContainer className="w-[85%]">
            <h1 id="seccion3">{t("official_info_appearances_header")}</h1>
            <h2 id="seccion3.1">{t("official_info_games_header")}</h2>
            <p>
              -<a href="">Perfect Cherry Blossom</a>: {t("official_info_games_th7_p")}
            </p>
            <p>
              -<a href="">Imperishable Night</a>: {t("official_info_games_th8_p")}
            </p>
            <p>
              -<a href="">Ten Desires</a>: {t("official_info_games_th13_p")}
            </p>
            <p>
              -<a href="">Immaterial and Missing Power</a>: Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Repellat nobis dignissimos
              unde tenetur! Eaque, corrupti alias consequuntur quisquam
              voluptate asperiores adipisci nulla consectetur tempore totam.
              Quia, veniam odio porro sunt sequi nulla sint repellendus magnam!
            </p>
            <p>
              -<a href="">Shoot the Bullet</a>: Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eum quas, quisquam minima illo
              tenetur cumque commodi ab neque. Assumenda, sequi?
            </p>
            <p>
              -<a href="">Scarlet Weather Rhapsody</a>: Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Dolor cum culpa consequatur ut
              voluptatibus reiciendis totam! Modi amet placeat excepturi unde
              rerum officia error numquam.
            </p>
            <p>
              -<a href="">Touhou Hisoutensoku</a>: Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Aperiam, optio corporis consequatur
              voluptates, odit quas non ad delectus, quae nihil illo quam
              tempore minus odio?
            </p>
            <p>
              -<a href="">Hopeless Masquerade</a>: Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Dicta non omnis itaque, veniam qui,
              deserunt ut delectus sunt nisi unde quae tempora repellat
              consectetur voluptate!
            </p>
            <p>
              -<a href="">Impossible Spell Card</a>: Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Pariatur expedita tenetur, ut labore
              provident incidunt cum quos fugiat vero nemo.
            </p>
            <h2 id="seccion3.2">{t("official_info_literature_header")}</h2>
            <p>
              - <a href="">Silent Sinner in Blue</a>: {t("official_info_literature_ssib_p")}
            </p>
            <p>
              -<a href="">Foul Detective Satori</a>: Parte de los primeros 
              incidentes cayendo victima incluso pero luego despertando y 
              tomando parte de ayudar en investigación pero solo durante el 
              primer volumen del manga.
            </p>
            <p>
              -<a href="">Strange and Bright Nature Deity</a>: Solo aparece 
              como personaje cameo en algunos capítulos
            </p>
            <p>
              -<a href="">Oriental Sacred Place.</a>: Aparece como personaje 
              secundario en el 'test de coraje' organizado por el Santuario
              Hakurei y las hadas de la luz donde manda a Youmu a participal
              en el.
            </p>
            <p>
              -<a href="">Visionary Fairies in Shrine</a>: Aparece como terciario
              en un capitu para observar el florecimiento de los arboles de 
              cerezo junto a Youmu en el Santuario Hakurei, las tres hadas de
              la luz junto a Clownpiece le juegan una broma a Youmu con la 
              antorcha de la locura. Tambien aparece como personaje de fondo 
              otros capitulos
            </p>
          </TextContainer>
          <div>
            <ImagesWiki
              src="/staticImgs/generalUse/MV5BOGViZjY3ZTgtNzhiYS00NjEyLWFkMGEtNTgwZDFkMDgyODYxXkEyXkFqcGc@._V1_QL75_UY207_CR35,0,140,207_.jpg"
              text="Touhou 7: Perfect Cherry Blossom"
            />
            <ImagesWiki
              src="/staticImgs/generalUse/Th08.png"
              text="Touhou 8: Imperishable Night"
              classImage="h-60 w-auto "
            />
          </div>
        </div>
        <div className="flex gap-10">
          <ImagesWiki
            src="/staticImgs/generalUse/200px-Th07Youmu.png"
            text="Sprite de Youmu en Touhou 7"
            classImage="h-62.5 w-auto"
          />
          <ImagesWiki
            src="/staticImgs/generalUse/200px-Th07Yukari.png"
            text="Sprite de Yukari en Touhou 7"
            classImage="h-62.5 w-auto"
          />
          <TextContainer className="w-[70%]">
            <h1 id="seccion4">Relaciones</h1>
            <h2 id="seccion4.1">Youmu Konpaku</h2>
            <p>
              Jardinera personal y secuaz de Yuyuko, muchas veces apareciendo
              juntas y otras veces es enviada a hacer ciertas tareas fuera del
              inframundo.
            </p>
            <h2 id="seccion4.2">Yukari Yakumo</h2>
            <p>
              Amiga cercana de Yuyuko incluso antes de su muerte. Yukari le, 
              permite conocer e incluso formar parte de sus planes con los que
              es normalmente muy secretiva.
            </p>
            <h2 id="seccion4.3">Eiki Shiki</h2>
            <p>
              El rol de Administradora de las almas de los muertos fue otorgado
              por la Yama (Eiki), por lo que es conocida por Yuyuko y esta le tiene
              respeto a Eiki
            </p>
          </TextContainer>
        </div>
        <div>
          <TextContainer>
            <h1 id="seccion5">Imagenes destacadas</h1>
          </TextContainer>
          <div className="flex gap-10">
            <ImagesWiki
              src="/staticImgs/generalUse/actual-drawings-made-by-zuns-wife-v0-faha70qce0ae1.jpg"
              text="Yuyuko dibujada en Gartic Phone durante un stream entre Zun y sus
            amigotes"
              classImage="w-72 h-auto"
            />
            <ImagesWiki
              src="/staticImgs/generalUse/Captura de pantalla 2025-07-09 163832.png"
              text="Yuyuko dibujada por la esposa de Zun en Gartic Phone"
              classImage="w-72 h-auto"
            />
            <ImagesWiki
              src="/staticImgs/generalUse/Th08Yuyuko.png"
              text="Sprite de Yuyuko en Touhou 8:Imperishable Night"
              classImage="h-73 w-auto"
            />
            <ImagesWiki
              src="/staticImgs/generalUse/yuyukoYyoumu.png"
              text="Yuyuko y Youmu en Strange and Bright Nature Deity"
              classImage="h-73 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
