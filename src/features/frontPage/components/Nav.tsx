import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserLog } from "@shared";

const TEXT_OPTION =
  "font-normal text-4xl text-pink-800 hover:text-pink-950 hover:border-b-2 hover:border-pink-950";

export default function Nav() {
  const { t } = useTranslation("home");
  return (
    <>
      <nav className="text-4xl  flex gap-20 items-center h-16 pt-5 pb-5 pl-2.5 pr-2.5 mt-2.5">
        <img
          src="/staticImgs/generalUse/yuyuko-yuyukofumo.gif"
          alt="brand"
          className="w-16"
        />

        <button>
          <Link
            to={"/oficial"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p className={TEXT_OPTION}>{t("nav_oficial")}</p>
          </Link>
        </button>
        <button>
          <Link
            to={"/fanon"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p className={TEXT_OPTION}>{t("nav_fanon")}</p>
          </Link>
        </button>
        <button>
          <Link
            to={"/images"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p className={TEXT_OPTION}>{t("nav_images")}</p>
          </Link>
        </button>
        <button>
          <Link
            to={"/merch"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p className={TEXT_OPTION}>{t("nav_merch")}</p>
          </Link>
        </button>
        <button>
          <Link
            to={"/featured"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <p className={TEXT_OPTION}>{t("nav_highlight")}</p>
          </Link>
        </button>
        <UserLog />
      </nav>
      <div className="max-w-full h-1 bg-pink-800"></div>
    </>
  );
}
