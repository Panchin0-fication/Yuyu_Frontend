import { TextContainer, type endingSprite } from "@shared";
import {
  MdKeyboardArrowDown,
  MdVisibilityOff,
  MdInfo,
  MdPerson,
} from "react-icons/md";
import { useState } from "react";
type props = {
  title: string;
  info: string;
  credits: string;
  id: string;
  endings?: endingSprite[] | null;
  setEndings?: React.Dispatch<React.SetStateAction<endingSprite[]>> | null;
};
export default function TitleSprites({
  title,
  info,
  credits,
  id,
  endings = null,
  setEndings = null,
}: props) {
  const [arrow, setArrow] = useState(false);

  //This funtion remove the spoiler from any of the sprites in endings section
  function handleShowAll() {
    if (!setEndings || !endings) return;
    const newEndings: endingSprite[] = endings.map((end) => {
      return { ...end, hidden: false };
    });
    setEndings(newEndings);
  }
  return (
    <>
      <div className="flex text-[20px] items-center gap-7.5 mt-3.75" id={id}>
        <h1>{title}</h1>
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={() => {
            setArrow(!arrow);
          }}
        >
          <MdKeyboardArrowDown
            className={`w-12.5 h-12.5 transition-transform duration-300 ${arrow ? "rotate-180" : ""}`}
          />
        </button>
        {/* if an ending is passed then it is because is the endings section */}
        {endings && (
          <button
            className="bg-transparent border-none cursor-pointer"
            onClick={() => handleShowAll()}
          >
            <MdVisibilityOff className="w-12.5 h-12.5" />
          </button>
        )}
      </div>
      <TextContainer
        className={`grid grid-cols-[3%_97%] text-lg items-center gap-2.5 transition-opacity duration-300 ease-out ${arrow ? "opacity-0" : ""}`}
      >
        <MdInfo className="w-7.5 h-7.5" />
        <p className="font-['Yanone_Kaffeesatz'] font-normal text-lg">{info}</p>
        <MdPerson className="w-7.5 h-7.5" />
        <p className="font-yanone font-normal text-lg">{credits}</p>
      </TextContainer>
    </>
  );
}
