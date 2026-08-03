import { useTranslation } from "react-i18next";
import styles from "./css/SmallMessage.module.css";

type props = {
  type: "info" | "error" | "success";
  message: string;
};
export default function SmallMessage({ type, message }: props) {
  var image, textStyle, iconColor, headerText;
  const { t } = useTranslation("common");
  switch (type) {
    case "error":
      image = "/icons/error_circle.svg";
      textStyle = styles.errorText;
      iconColor = styles.iconRed;
      headerText = t("header_fail");
      break;
    case "success":
      image = "/icons/check.svg";
      textStyle = styles.successText;
      iconColor = styles.iconGreen;
      headerText = t("header_success");
      break;
    default:
      headerText = "Info";
      image = "/icons/info_circle.svg";
      break;
  }
  return (
    <div className={styles.loginMessage}>
      <header className={styles.messageHeader}>
        <img className={iconColor} src={image} alt="" />
        <p className={`${textStyle} ${styles.messageHeader}`}>{headerText}</p>
      </header>
      <hr className={`${styles.downBar} ${textStyle}`} />
      <p className={`${textStyle} ${styles.space}`}>{message}</p>
    </div>
  );
}
