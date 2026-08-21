import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";
type props = {
  image: string;
  isInPage?: boolean;
  header?: string;
};
export default function HeaderPage({
  image,
  isInPage = false,
  header = "Yuyuko Saigyouji",
}: props) {
  return (
    <>
      <div className="flex gap-12.5 items-center ml-7.5 pt-2.5">
        <img className="h-22.5 w-auto" src={image} alt="" />
        <h2 className="text-pink-700 text-6xl font-bold">{header}</h2>
        <div className="flex gap-10 items-center">
          {isInPage && (
            <Link to={"/images"}>
              <FaDoorOpen className="text-pink-700 text-5xl" />
            </Link>
          )}

          <Link to={"/"}>
            <FaHouse className="text-pink-700 text-5xl" />
          </Link>
        </div>
      </div>

      <div className="bg-pink-700 w-full h-1 mt-2"></div>
    </>
  );
}
