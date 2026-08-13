import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Select, { type StylesConfig } from "react-select";
import type {
  mangaPages,
  mangaPage,
  returnedReducedQuality,
  fanArtReducedQuality,
  MyOption,
} from "@shared";
import { ReduceQuality } from "@shared";
import styles from "./css/MangaBrowser.module.css";

type props = {
  name: string;
};
export default function MangaBrowser({ name }: props) {
  const { t } = useTranslation("images");
  const [num, setNum] = useState(1);
  const [chapter, setChapter] = useState<string | undefined>("");
  const [vol, setVol] = useState<string | undefined>("");
  const [lot, setLot] = useState("3");
  const [optionsChapter, setOptionsChapter] = useState<MyOption[]>([
    { label: t("manga_all_option"), value: "" },
  ]);
  const [optionsVol, setOptionsVol] = useState<MyOption[]>([
    { label: t("manga_all_option"), value: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<mangaPage[] | null>(null);
  const [next, setNext] = useState(false);
  const [reduced, setReduced] = useState<fanArtReducedQuality[]>([]);

  async function getPages(actualNum: number) {
    try {
      setLoading(true);
      var extra = `num=${actualNum}&name=${name}`;
      if (chapter !== "") extra += `&chapter=${chapter}`;
      if (vol !== "") extra += `&vol=${vol}`;
      if (lot !== "") extra += `&lot=${lot}`;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/manga?${extra}`,
      );
      const data = (await response.json()) as mangaPages;

      let reduced: fanArtReducedQuality[] = [];

      for (const page of data.pages) {
        let actualReduced = (await ReduceQuality(
          page.src,
          700,
          700,
        )) as returnedReducedQuality;

        reduced.push({
          src: actualReduced.reduced,
          height: actualReduced.height,
          width: actualReduced.width,
          index: reduced.length,
          wasReduced: actualReduced.changed,
        });
      }
      setReduced(reduced);
      setPages(data.pages);
      setNext(data.next);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPages(num);
    const getData = async () => {
      const responseCh = await fetch(
        `${import.meta.env.VITE_API_URL}/manga/data?name=${name}&field=chapter`,
      );
      const dataCh = (await responseCh.json()) as number[];
      setOptionsChapter(
        optionsChapter.concat(
          dataCh.map((chapter) => ({
            label: String(chapter),
            value: String(chapter),
          })),
        ),
      );

      const responseVol = await fetch(
        `${import.meta.env.VITE_API_URL}/manga/data?name=${name}&field=vol`,
      );
      const dataVol = (await responseVol.json()) as number[];
      setOptionsVol(
        optionsVol.concat(
          dataVol.map((chapter) => ({
            label: String(chapter),
            value: String(chapter),
          })),
        ),
      );
    };
    getData();
  }, []);

  const isInitialMount = useRef(0);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (isInitialMount.current <= 1) {
      isInitialMount.current = isInitialMount.current + 1;
    } else if (isInitialMount.current >= 2) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setNum(1);
        getPages(1);
      }, 1500);
    }
  }, [vol, chapter, lot]);

  const customStyles: StylesConfig<MyOption, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: "gray",
      boxShadow: "none",
      borderWidth: 2,
      borderRadius: 0,
      "&:hover": {
        borderColor: "black",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(232, 62, 169)" : "white",
      "&:hover": {
        borderColor: state.isSelected ? "rgb(232, 62, 169)" : "pink",
      },
    }),
  };

  return (
    <div>
      <div className={styles.search}>
        <h2>Volumen:</h2>
        <Select
          styles={customStyles}
          options={optionsVol}
          defaultValue={optionsVol[0] || null}
          onChange={(value) => setVol(value?.value)}
        ></Select>
        <h2>{t("mangas_searcher_chapter")} </h2>
        <Select
          styles={customStyles}
          options={optionsChapter}
          defaultValue={optionsVol[0] || null}
          onChange={(value) => setChapter(value?.value)}
        ></Select>
        <h2>{t("mangas_searcher_num")}</h2>
        <input
          className={styles.input}
          placeholder="3"
          type="text"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
        />
      </div>

      {pages && pages.length >= 1 && (
        <>
          <div
            className={`${styles.multiplePages} ${loading ? styles.loading : ""}`}
          >
            {reduced?.map((page) => (
              <div className={`${styles.mangaPage}`} key={page.index}>
                <img
                  height={page.height / 1.5}
                  width={page.width / 1.5}
                  src={page.src}
                />
                <p>
                  {`${t("manga_info_vol")} ${pages[page.index].vol} | ${t("manga_info_chapter")}
                ${pages[page.index].chapter} | ${t("manga_info_page")} ${pages[page.index].page}`}
                </p>
              </div>
            ))}
            <img
              style={{
                display: loading ? "block" : "none",
                position: "absolute",
              }}
              src="/staticImgs/generalUse/kfc-kfcyuyuko.gif"
              alt=""
            />
          </div>
          <div className={styles.numSelection}>
            <img
              onClick={() => {
                if (num > 1 && !loading) {
                  setNum(num - 1);
                  getPages(num - 1);
                }
              }}
              className={num > 1 ? styles.arrowActive : ""}
              src="/icons/arrow_back.svg"
              alt=""
            />
            <p>{num}</p>
            <img
              onClick={() => {
                if (next && !loading) {
                  setNum(num + 1);
                  getPages(num + 1);
                }
              }}
              className={next ? styles.arrowActive : ""}
              src="/icons/arrow_forward.svg"
              alt=""
            />
          </div>
        </>
      )}
      {pages && pages.length === 0 && (
        <p className={styles.notFoundPages}>{t("manga_no_pages")}</p>
      )}
    </div>
  );
}
