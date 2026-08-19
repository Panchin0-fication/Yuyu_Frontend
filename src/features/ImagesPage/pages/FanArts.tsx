import { useEffect, useState, startTransition, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HeaderPages,
  ReduceQuality,
  InfoMessage,
  Message,
  HoverInfo,
} from "@shared";
import type {
  fanArt,
  fanArtReducedQuality,
  returnedReducedQuality,
  withFanArt,
} from "@shared";
import {
  MdAddBox,
  MdSearch,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
export default function FanArts() {
  //Used in all the page
  const { t } = useTranslation("images");
  const navigate = useNavigate();
  const [addFanartHover, setAddFanartHover] = useState<boolean>(false);
  const [message, setMessage] = useState<ReactNode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<null | {
    general: string[];
    artist: string[];
    caracters: string[];
  }>(null);
  //Used in general fan art display
  const [data, setData] = useState<fanArt[] | null>(null);
  const [reducedData, setReducedData] = useState<fanArtReducedQuality[] | null>(
    null,
  );
  const [leftArrow, setLeftArrow] = useState<boolean>(false);
  const [rightArrow, setRightArrow] = useState<boolean>(false);
  //Used when displaying just one fan art
  const [unique, setUnique] = useState<null | fanArtReducedQuality>(null);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  function renderUnique(fanArt: fanArtReducedQuality): void {
    if (!data) return;
    setLoading(true);
    setUnique(fanArt);

    let general: string[] = [];
    let artist: string[] = [];
    let caracters: string[] = [];

    for (const tag of data[fanArt.index].tags) {
      general.push(tag);
    }

    for (const tag of data[fanArt.index].artists) {
      artist.push(tag);
    }

    for (const tag of data[fanArt.index].caracters) {
      caracters.push(tag);
    }
    setTags({ general: general, artist: artist, caracters: caracters });
    setLoading(false);
  }

  async function render(newActiveTags = false): Promise<void> {
    setLoading(true);
    setUnique(null);
    setShowOriginal(false);

    var queryString: String;
    if (!newActiveTags) {
      queryString = activeSearch
        .split(" ")
        .map((tag) => `tags=${encodeURIComponent(tag)}`)
        .join("&");
    } else {
      queryString = search
        .split(" ")
        .map((tag) => `tags=${encodeURIComponent(tag)}`)
        .join("&");
    }
    function errorResonse(): boolean {
      setMessage(
        <Message
          header={t("UNEXPECTED_ERROR")}
          text={t("UNEXPECTED_ERROR")}
          type="error"
          setMessage={setMessage}
          toRedirect=""
        />,
      );
      setLoading(false);
      return true;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/fanArts/tags/${page}?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!response.ok) if (errorResonse()) return;
    const res = (await response.json()) as withFanArt;
    if (!res.success) if (errorResonse()) return;

    let data = res.fanArts;

    page <= 1 ? setLeftArrow(false) : setLeftArrow(true);
    data.length === 9 ? setRightArrow(true) : setRightArrow(false);

    //SSAFSUEFNOGUN
    data.splice(8);
    setData(data);

    let reduced: fanArtReducedQuality[] = [];

    let general: string[] = [];
    let artist: string[] = [];
    let caracters: string[] = [];

    for (const fanArt of data) {
      let rer = (await ReduceQuality(
        fanArt.src,
        800,
        800,
      )) as returnedReducedQuality;

      reduced.push({
        src: rer.reduced,
        height: rer.height,
        width: rer.width,
        index: reduced.length,
        wasReduced: rer.changed,
      });
      //If the src equals to the error image it continues to the next
      //element without add tags
      if (rer.reduced === "/staticImgs/generalUse/200px-Th07Youmu.png") {
        continue;
      }

      for (const tag of fanArt.tags) {
        if (!general.includes(tag)) {
          general.push(tag);
        }
      }

      for (const tag of fanArt.artists) {
        if (!artist.includes(tag)) {
          artist.push(tag);
        }
      }

      for (const tag of fanArt.caracters) {
        if (!caracters.includes(tag)) {
          caracters.push(tag);
        }
      }
    }
    setTags({ general: general, artist: artist, caracters: caracters });

    setReducedData(reduced);
    setLoading(false);
  }

  function addTag(tag: string) {
    if (search === "") {
      setSearch(`${tag}`);
    } else {
      setSearch(search + " " + `${tag}`);
    }
  }

  function onCancel(): void {
    setMessage(null);
  }
  function onContinue(): void {
    navigate("/fanArts/Post");
  }

  async function addFanartButtonClick(): Promise<void> {
    startTransition(() => {
      setMessage(
        <InfoMessage
          header={t("info_message_add_fan_art_header")}
          onCancel={() => onCancel()}
          onContinue={() => onContinue()}
        >
          <span>{t("info_message_add_fan_art_span")}</span>

          <p>{t("info_message_add_fan_art_p_one")}</p>
          <ol>
            <li>{t("info_message_add_fan_art_li_one")}</li>
            <li>{t("info_message_add_fan_art_li_two")}</li>
            <li>{t("info_message_add_fan_art_li_three")}</li>
          </ol>
          <p>{t("info_message_add_fan_art_p_two")}</p>
        </InfoMessage>,
      );
    });
  }

  useEffect(() => {
    render();
  }, [page]);

  return (
    reducedData && (
      <>
        {message}
        <div className="min-h-screen">
          <HeaderPages
            image="staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_dounaga_nuko__sample-2fd9d01a7877ab582bb7da7d425263dd.jpg"
            isInPage={true}
            header={t("header_fanarts")}
          />
          <div className="w-[95%] mx-auto">
            <div className="mt-5 grid grid-cols-[20%_80%] gap-7.5">
              <div className="">
                <div className="flex items-center justify-center gap-2.5 mb-1.25">
                  <div
                    className="flex items-center justify-center bg-white p-0.75 rounded-xm cursor-pointer hover:bg-[#e8e7e7]"
                    onClick={() => addFanartButtonClick()}
                    onMouseOverCapture={() => setAddFanartHover(true)}
                    onMouseOut={() => setAddFanartHover(false)}
                  >
                    <MdAddBox size={24} />
                    <HoverInfo
                      info={t("add_tag_span")}
                      hover={addFanartHover}
                    />
                  </div>

                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="All"
                    value={search}
                    type="text"
                    className="p-1"
                  />
                  <button
                    onClick={async () => {
                      if (!loading) {
                        setPage(1);
                        setActiveSearch(search);
                        await render(true);
                      }
                    }}
                  >
                    <MdSearch size={24} />
                  </button>
                </div>
                <div className="bg-white/80 flex flex-col justify-start h-max py-2.5 px-3.75">
                  <h3 className="text-[26px] pl-1.75">
                    {t("tag_header_general")}
                  </h3>
                  {tags &&
                    tags.general.map((tag) => (
                      <p
                        key={tag}
                        className="text-[#305091] w-max text-[17px] hover:brightness-50 pl-3 cursor-pointer"
                        onClick={() => {
                          addTag(tag);
                        }}
                      >
                        {tag}
                      </p>
                    ))}
                  <h3 className="text-[26px] pl-1.75">
                    {t("tag_header_characters")}
                  </h3>
                  {tags &&
                    tags.caracters.map((tag) => (
                      <p
                        key={tag}
                        className="text-[#c72d2d] w-max text-[17px] hover:brightness-50 pl-3 cursor-pointer"
                        onClick={() => {
                          addTag(tag);
                        }}
                      >
                        {tag}
                      </p>
                    ))}
                  {tags && tags.artist.length >= 1 && (
                    <h3 className="text-[26px] pl-1.75">
                      {t("tag_header_artist")}
                    </h3>
                  )}
                  {tags &&
                    tags.artist.map((tag) => (
                      <p
                        key={tag}
                        className="text-[#b144ca] w-max text-[17px] hover:brightness-50 pl-3 cursor-pointer"
                        onClick={() => {
                          addTag(tag);
                        }}
                      >
                        {tag}
                      </p>
                    ))}
                  {tags && unique && (
                    <>
                      <h3 className="text-[26px] pl-1.25">
                        {t("tag_header_link")}
                      </h3>
                      <p
                        onClick={() => {
                          if (data)
                            window.open(data[unique.index].originalLink);
                        }}
                        className="text-[#f0d046] text-wrap whitespace-normal wrap-break-word max-w-full w-max text-[17px] hover:brightness-50 pl-3 cursor-pointer"
                      >
                        {data && data[unique.index].originalLink}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!unique && (
                <div className="grid grid-cols-2 gap-7.5 justify-items-center">
                  <div
                    className="flex justify-center absolute"
                    style={{ display: loading ? "block" : "none" }}
                  >
                    <img src="/staticImgs/generalUse/kfc-kfcyuyuko.gif" />
                  </div>
                  {!loading &&
                    reducedData.map((fanArt) => (
                      <button
                        className="cursor-pointer"
                        key={fanArt.src}
                        onClick={() => {
                          renderUnique(fanArt);
                        }}
                      >
                        <img
                          src={fanArt.src}
                          style={{
                            width: fanArt.width / 2.5,
                            height: fanArt.height / 2.5,
                          }}
                          alt=""
                        />
                      </button>
                    ))}
                </div>
              )}
              {data && unique && (
                <div className="">
                  {unique.wasReduced && !showOriginal && (
                    <div className="bg-[rgba(253,113,197,0.859)] py-2.5 px-3.75 w-[40vw] rounded-[15px] items-center mb-3.75">
                      <button
                        onClick={() => {
                          setShowOriginal(true);
                        }}
                      >
                        <p className="text-[19px] hover:text-[#3e3eff] cursor-pointer">
                          {t("show_original")}
                        </p>
                      </button>
                    </div>
                  )}
                  <img
                    src={showOriginal ? data[unique.index].src : unique.src}
                    height={unique.height}
                    width={unique.width}
                    alt=""
                  />
                </div>
              )}
            </div>
            {!unique && (
              <div className="flex gap-6.25 items-center mt-11.25 pb-5 ml-[50vw]">
                <button
                  onClick={() => {
                    if (leftArrow && !loading) {
                      setPage(page - 1);
                    }
                  }}
                >
                  <MdArrowBack
                    className={`${leftArrow ? "text-blue-400 text-lg cursor-pointer" : ""} h-10 w-13.75`}
                  />
                </button>
                <p className="text-[23px]">{page}</p>

                <button
                  onClick={() => {
                    if (rightArrow && !loading) {
                      setPage(page + 1);
                    }
                  }}
                >
                  <MdArrowForward
                    className={`${rightArrow ? "text-blue-400 text-lg cursor-pointer" : ""} h-10 w-13.75`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
}
