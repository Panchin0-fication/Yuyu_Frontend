import { type tag } from "@shared";
import { FaCheck } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
type props = {
  tag: tag;
  errorTag: string | null;
  addTagFromSearch?: ((tag: tag) => void) | undefined;
  removeTag?: ((tag: tag) => void) | undefined;
  //For the fan art validation process
  validation?: boolean;
  verifiedTag?: ((tag: tag) => void) | undefined;
  changeShowEdit?: ((tag: tag) => void) | undefined;
};
export default function TagLabel({
  tag,
  errorTag,
  addTagFromSearch,
  removeTag,

  validation = false,
  verifiedTag,
  changeShowEdit,
}: props) {
  return (
    <div
      className={`${tag.category === "general" && "bg-[#305091]"} ${tag.category === "character" && "bg-[#c72d2d]"} ${tag.category === "artist" && "bg-[#b144ca]"}`}
      onClick={addTagFromSearch && (() => addTagFromSearch(tag))}
    >
      <div
        className={`${tag.name === errorTag && "animate-blinkAni"} ${"text-white p-1.25 flex items-center w-max gap-1.25"}`}
      >
        <p
          className={`${tag.name === errorTag && "animate-blinkAni"}  ${"cursor-pointer"}`}
        >
          {tag.name}
        </p>
        {validation && verifiedTag && changeShowEdit && (
          <>
            <div className="flex items-center">
              <RiPencilFill
                onClick={() => changeShowEdit(tag)}
                className="cursor-pointer text-white h-5 w-5"
              />
            </div>

            <div className="flex items-center">
              <FaCheck
                onClick={() => verifiedTag(tag)}
                className="cursor-pointer text-white h-4 w-4"
              />
            </div>
          </>
        )}
        {removeTag && (
          <div className="flex items-center">
            <IoClose
              onClick={() => removeTag(tag)}
              className="cursor-pointer text-white h-5 w-5"
            />
          </div>
        )}
      </div>
    </div>
  );
}
