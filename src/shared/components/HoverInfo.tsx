import styles from "./css/HoverInfo.module.css";
type props = {
  hover: boolean;
  info: string;
};
export default function HoverInfo({ hover, info }: props) {
  return (
    <span className={`${styles.infoSpan} ${hover && styles.showSpan}`}>
      {info}
    </span>
  );
}
