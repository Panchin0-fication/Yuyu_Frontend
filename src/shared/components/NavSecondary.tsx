import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
type props = {
  actualPage: string;
  classNameExtra?: string;
};
export default function NavSecondary({ actualPage, classNameExtra }: props) {
  const { t } = useTranslation("common");
  return (
    <div className={`${classNameExtra} ${"pt-2"}`}>
      {actualPage !== "oficial" && (
        <button className="bg-pink-800 border-l-4 border-pink-500 border-t-4 border-b-4 py-0.5 px-2 text-xl font-normal">
          <Link to={"/oficial"}>
            <p className="text-white">{t("nav_oficial")}</p>
          </Link>
        </button>
      )}

      {actualPage !== "fanon" && (
        <button className="bg-pink-800 border-l-4 border-pink-500 border-t-4 border-b-4 py-0.5 px-2 text-xl font-normal">
          <Link className="text-white" to={"/fanon"}>
            {t("nav_fanon")}
          </Link>
        </button>
      )}

      {actualPage !== "images" && (
        <button className="bg-pink-800 border-l-4 border-pink-500 border-t-4 border-b-4 py-0.5 px-2 text-xl font-normal">
          <Link className="text-white" to={"/images"}>
            {t("nav_images")}
          </Link>
        </button>
      )}

      {actualPage !== "highlight" && (
        <button className="bg-pink-800 border-l-4 border-pink-500 border-t-4 border-b-4 py-0.5 px-2 text-xl font-normal border-r-4">
          <Link to={"/featured"} className="text-white">
            {t("nav_highlight")}
          </Link>
        </button>
      )}
    </div>
  );
}
