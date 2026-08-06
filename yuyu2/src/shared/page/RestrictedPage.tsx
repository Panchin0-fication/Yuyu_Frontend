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
    <div className={styles.mainContainer}>
      <h2>{t("inaccesible_header")}</h2>
      <p>{info}</p>

      <button onClick={() => navigate(toRedirect)}>
        {toRedirect === "/auth/login"
          ? t("inaccesible_button_login")
          : t("inaccesible_button_return")}
      </button>
      <img className={styles.image} src={backgroundImg} alt="" />
    </div>
  );
}
