import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./RestrictedPage.module.css";
type props = {
  info: string;
  backgroundImg: string;
  toRedirect: string;
};
export default function RestrictedPage({
  info,
  backgroundImg,
  toRedirect,
}: props) {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  return (
    <div
      className={`${styles.mainContainer} ${"min-h-screen w-full fixed top-[50%] left-[50%] translate-[-50%] place-self-center flex flex-col items-center justify-center text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000] text-center text-white bg-[#fcbed1]"}`}
    >
      <h2 className="-translate-y-12.5 z-20 text-6xl text-white text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]">
        {backgroundImg === "/staticImgs/generalUse/tewi_not_found.png"
          ? t("not_found_header")
          : t("inaccesible_header")}
      </h2>
      <p className="-translate-y-12.5 z-20 text-3xl text-black text-shadow-[-1px_-1px_0_#ffffff,1px_-1px_0_#ffffff,-1px_1px_0_#ffffff,1px_1px_0_#ffffff]">
        {info}
      </p>

      <button
        className="bg-blue-500 text-white z-20 text-2xl p-1.75 rounded-md -translate-y-7.5 hover:bg-pink-700 cursor-pointer transition-colors duration-300"
        onClick={() => navigate(toRedirect)}
      >
        {toRedirect === "/auth/login"
          ? t("inaccesible_button_login")
          : t("inaccesible_button_return")}
      </button>
      <img
        className="absolute h-175 opacity-80 z-10"
        src={backgroundImg}
        alt=""
      />
    </div>
  );
}
