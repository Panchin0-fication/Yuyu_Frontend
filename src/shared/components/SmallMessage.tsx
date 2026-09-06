import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
type props = {
  type: "info" | "error" | "success";
  message: string;
};
export default function SmallMessage({ type, message }: props) {
  var image, textStyle, headerText;
  const { t } = useTranslation("common");
  switch (type) {
    case "error":
      image = <MdOutlineErrorOutline className="text-red-500 text-lg" />;
      textStyle = "text-red-500";
      headerText = t("header_fail");
      break;
    case "success":
      image = <FaCheck className="text-green-600 text-lg" />;
      textStyle = "text-green-600";
      headerText = t("header_success");
      break;
    default:
      headerText = "Info";
      image = <IoMdInformationCircleOutline className="text-white text-lg" />;
      break;
  }
  return (
    <div className="mt-2.5 min-w-37.5">
      <header className="flex gap-3.75 items-center text-2xl lg:text-3xl font-medium">
        {image}
        <p
          className={`${textStyle} ${"flex gap-3.75 items-center text-lg font-medium"}`}
        >
          {headerText}
        </p>
      </header>
      <hr className={`${"mt-1.25"} ${textStyle}`} />
      <p className={`${textStyle} ${"mt-2.5"}`}>{message}</p>
    </div>
  );
}
