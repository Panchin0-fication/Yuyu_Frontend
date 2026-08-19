import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
type props = {
  type: "error" | "success" | "info";
  message: string;
};
export default function BlockMessage({ type, message }: props) {
  var icon;

  switch (type) {
    case "error":
      icon = <FaXmark className="text-white" />;

      break;

    case "success":
      icon = <FaCheck text-white />;

      break;
    default:
      break;
  }
  return (
    <div
      className={`${"p-5 gap-3 border-black border-[3px] bg-white rounded-3.75 flex items-center text-2xl"}`}
    >
      {icon}
      <p>{message}</p>
    </div>
  );
}
