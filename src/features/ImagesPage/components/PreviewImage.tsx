import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { type fanArt } from "@shared";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";

type props = {
  closeFunc: () => void;
  increaseFunc: () => void;
  decreaseFunc: () => void;
  show: boolean;
  //For PostFanArts
  file?: string | null;
  previewRef?: any;
  PreviewLoad?: () => void;
  //For the FanArt validation
  dimensions?: { height: number; width: number };
  fanArt?: fanArt;
};
export default function PreviewImage({
  closeFunc,
  increaseFunc,
  decreaseFunc,
  show,
  file,
  previewRef,
  PreviewLoad,
  dimensions,
  fanArt,
}: props) {
  const { t } = useTranslation("images");
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="absolute right-90 top-40 bg-white w-75 max-h-[80vh] cursor-move z-50"
      >
        {show && (
          <>
            <header className="flex justify-between items-center py-3 pl-4 select-none">
              <p className="text-xl">{t("fanart_preview_text")}</p>
              <label
                className="absolute r-4 cursor-pointer"
                onClick={closeFunc}
              >
                X
              </label>
            </header>
            <div className="pl-3">
              <button className="w-max" onClick={increaseFunc}>
                <MdAddBox size={24} />
              </button>
              <button className="w-max" onClick={decreaseFunc}>
                <MdIndeterminateCheckBox size={24} />
              </button>
            </div>
            <div className="flex justify-center items-center bg-white min-h-50 overflow-scroll max-h-[60vh]">
              {PreviewLoad && file && (
                <img
                  onLoad={PreviewLoad}
                  ref={previewRef}
                  src={file}
                  className="object-contain"
                />
              )}

              {dimensions && fanArt && (
                <img
                  height={dimensions.height}
                  width={dimensions.width}
                  src={fanArt.src}
                  className="object-contain"
                />
              )}
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
}
