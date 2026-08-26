import { useTranslation } from "react-i18next";
import { type endingSprite } from "@shared";

type props = {
  src: string;
  info: string;
  endings: endingSprite[];
  ending: endingSprite;
  setEndings: React.Dispatch<React.SetStateAction<endingSprite[]>>;
};
export default function ImageSpoiler({
  src,
  endings,
  ending,
  info,
  setEndings,
}: props) {
  const { t } = useTranslation("images");
  function handleClick() {
    const newEndings = endings.map((end) => {
      if (end.id === ending.id) {
        return { ...end, hidden: false };
      } else {
        return end;
      }
    });
    setEndings(newEndings);
  }

  return (
    <div className="flex flex-col justify-center">
      <img
        src={src}
        className={`${ending.hidden ? "brightness-0" : ""} ${"w-160 h-117.5"}`}
      ></img>
      <button
        className={`${"bg-gray-400 flex absolute items-center m-72 cursor-pointer text-white p-2.5 rounded-lg h-max w-max text-2xl justify-center"} ${!ending.hidden ? "cursor-none opacity-0" : ""}`}
        onClick={() => handleClick()}
      >
        <p className={"  "}>{t("spoiler_label")}</p>
      </button>
      <p>{info}</p>
    </div>
  );
}
