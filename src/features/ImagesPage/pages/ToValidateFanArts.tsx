import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Profile,
  HeaderPages,
  Message,
  ReduceQuality,
  TagLabel,
  type withUserData,
  type fanArt,
  type fanArtReducedQuality,
  type returnedReducedQuality,
  type tag,
} from "@shared";
import { useTranslation } from "react-i18next";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function ToValidateFanArts() {
  const { t } = useTranslation("images");
  const [message, setMessage] = useState<undefined | ReactNode>();
  const [fanArts, setFanArts] = useState<fanArt[]>([]);
  const [reduced, setReduced] = useState<fanArtReducedQuality[]>([]);
  const [verTags, setVerTags] = useState<tag[]>([]);
  const [unverTags, setUnverTags] = useState<tag[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Valides current user
  useEffect(() => {
    const getProfile = async () => {
      const responseProfile = (await Profile(
        localStorage.getItem("token"),
      )) as withUserData;
      if (
        !responseProfile.success ||
        responseProfile.user_data.role !== "Admin"
      ) {
        setMessage(
          <Message
            header={t("message_header_unautorized")}
            text={t("message_text_unautorizes")}
            type="error"
            setMessage={setMessage}
            toRedirect="/"
          />,
        );
      }
    };
    getProfile();
  }, []);

  //Gets FanArts
  useEffect(() => {
    const getToValidateFanArts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/fanArt/${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        if (response.status === 429) {
          setMessage(
            <Message
              header={t("429_error_code")}
              type="error"
              text={t("429_error_code")}
              setMessage={setMessage}
              toRedirect=""
            />,
          );
        }
        return;
      }
      const data = (await response.json()) as fanArt[];
      setFanArts(data);

      var reduced: fanArtReducedQuality[] = [];
      var allTags: string[] = [];
      for (const fanArt of data.slice(0, 5)) {
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

        allTags = allTags.concat(fanArt.artists, fanArt.caracters, fanArt.tags);
      }
      var tagSet = new Set(allTags);
      setReduced(reduced);

      const queryString: String = [...tagSet]
        .map((tag) => `tags=${encodeURIComponent(tag)}`)
        .join("&");

      const responseUnVer = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/unverified_tags?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        if (response.status === 429) {
          setMessage(
            <Message
              header={t("429_error_code")}
              type="error"
              text={t("429_error_code")}
              setMessage={setMessage}
              toRedirect=""
            />,
          );
        }
        setLoading(false);
        return;
      }

      type thisResponse = {
        unverified_tags: tag[] | null;
        verified_tags: tag[] | null;
      };

      const dataTags = (await responseUnVer.json()) as thisResponse;
      if (dataTags.unverified_tags && dataTags.verified_tags) {
        setUnverTags(dataTags.unverified_tags);
        setVerTags(dataTags.verified_tags);
      }
    };

    setLoading(false);
    getToValidateFanArts();
  }, [page]);

  function sendToValidate(reduced: fanArtReducedQuality) {
    const fanArtPendigTags = unverTags.filter(
      (tag) =>
        fanArts[reduced.index].artists.includes(tag.name) ||
        fanArts[reduced.index].caracters.includes(tag.name) ||
        fanArts[reduced.index].tags.includes(tag.name),
    );
    const fanArtVerifiedTags = verTags.filter(
      (tag) =>
        fanArts[reduced.index].artists.includes(tag.name) ||
        fanArts[reduced.index].caracters.includes(tag.name) ||
        fanArts[reduced.index].tags.includes(tag.name),
    );
    const toPass = {
      reduced: reduced,
      fanArt: fanArts[reduced.index],
      pending: fanArtPendigTags,
      verified: fanArtVerifiedTags,
    };
    navigate("/fanArts/validatePost", { state: toPass });
  }
  return (
    <>
      {message}
      <div className="min-h-screen">
        <HeaderPages
          image="/staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_y75zei__sample-9f89b813ebba2f314ea98108f9069cda.png"
          header={t("header_to_validate")}
        />

        <div className="flex gap-5 items-center justify-center pt-5">
          <MdArrowBack
            className={`w-6 h-6 ${page > 1 ? "text-blue-400 text-lg cursor-pointer" : ""}`}
            onClick={() => {
              if (page > 1 && !loading) {
                setLoading(true);
                setPage(page - 1);
              }
            }}
          />
          <p>{page}</p>
          <MdArrowForward
            className={`w-6 h-6 ${fanArts.length > 5 ? "text-blue-400 text-lg cursor-pointer" : ""}`}
            onClick={() => {
              if (fanArts.length > 5 && !loading) {
                setLoading(true);
                setPage(page + 1);
              }
            }}
          />
        </div>
        <div className="flex gap-5 justify-center items-center pt-5">
          {fanArts &&
            reduced
              .slice(0, 5)
              .map((fan) => (
                <img
                  key={fan.index}
                  src={fan.src}
                  width={fan.width / 3}
                  height={fan.height / 3}
                  onClick={() => sendToValidate(fan)}
                />
              ))}
        </div>
        <div className="bg-[rgb(255,250,250)] p-2.5 m-3.75 mt-11.25">
          <h2 className="font-normal pb-2.5">{t("unverified_tags_label")}</h2>
          <div className="flex gap-2.5">
            {unverTags.length < 1 && <p>{t("no_unverified_tags")}</p>}
            {unverTags.length >= 1 &&
              unverTags.map((tag) => (
                <TagLabel key={tag.name} tag={tag} errorTag={""} />
              ))}
          </div>
          <br />
          <h2 className="font-normal pb-2.5">{t("verified_tags_label")}</h2>
          <div className="flex gap-2.5">
            {verTags &&
              verTags.length >= 1 &&
              verTags.map((tag) => (
                <TagLabel key={tag.name} tag={tag} errorTag={""} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
