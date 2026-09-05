import {useState} from "react"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { UserLog } from "@shared";

const TEXT_OPTION =
  "font-normal text-2xl lg:text-4xl text-pink-800 hover:text-pink-950 hover:border-b-2 hover:border-pink-950";

export default function Nav() {
  const { t } = useTranslation("home");
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className="flex items-center py-3 lg:p-0">
        {(showNav || window.innerWidth > 1024) && 
        <nav className="text-4xl absolute top-0 left-0 lg:relative bg-white lg:bg-transparent border-y-2 border-r-2 border-black lg:border-none z-20 flex flex-col lg:flex-row gap-5 lg:gap-20 items-center h-max lg:h-16 pt-5 pb-5 pl-2.5 pr-2.5 mt-2.5">
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
        
        </nav>}
        <UserLog />
        {window.innerWidth <= 1024 && <FaBars onClick={()=>setShowNav(!showNav)} className="text-4xl pr-5"/>}
        
      </div>
      
     <div className="max-w-full h-1 bg-pink-800"></div>
      
    </>
  );
}
