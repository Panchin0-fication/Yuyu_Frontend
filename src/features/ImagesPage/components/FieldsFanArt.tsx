import { useEffect, useState, type ReactNode } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Message } from "@shared";
import { MdEdit, MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import {
  type previewImageDimensions,
  type fieldsFanArtsInput,
  type fanArt,
} from "@shared";

type props = {
  fileRef?: React.RefObject<any>;
  file?: string | null;
  setFile?: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviewImageDimensions?: React.Dispatch<
    React.SetStateAction<previewImageDimensions>
  >;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: fieldsFanArtsInput;
  setInputs: React.Dispatch<React.SetStateAction<fieldsFanArtsInput>>;
  //For the fan art validation component
  mode?: "upload" | "verify";
  fanArt?: fanArt;
};
export default function FieldsFanArt({
  fileRef,
  file,
  setFile,
  setPreviewImageDimensions,
  show,
  setShow,
  inputs,
  setInputs,
  mode = "upload",
  fanArt,
}: props) {
  const { t } = useTranslation("images");
  const [editLink, setEditLink] = useState(true);
  useEffect(() => {
    if (mode === "verify") {
      setEditLink(false);
    }
    console.log("ESE FER", fileRef?.current.files);
  }, []);
  const [message, setMessage] = useState<ReactNode | null>(null);
  const BOLD_CONFIG = <span className="font-medium whitespace-nowrap"></span>;

  return (
    <>
      <div className="grid grid-cols-3 place-items-center">
        {/*File div */}
        <div className="bg-white leading-4.5 border-2 border-black rounded-lg p-1 w-113 flex flex-col gap-0.5 items-center">
          {mode === "upload" &&
            fileRef &&
            setFile &&
            setPreviewImageDimensions && (
              <>
                <h3 className="font-bold text-2xl">
                  {t("header_select_file")}
                </h3>
                <p>{t("body_select_file_p_one")}</p>
                <p>{t("body_select_file_p_two")}</p>
                <input
                  onChange={() => {
                    if (!fileRef.current) return;
                    if (
                      fileRef.current.files[fileRef.current.files.length - 1]
                        .size > 5242880
                    ) {
                      setMessage(
                        <Message
                          type="error"
                          header={t("file_exceeds_size")}
                          text={t("file_exceeds_size_text")}
                          setMessage={setMessage}
                          toRedirect=""
                        />,
                      );
                      fileRef.current.value = "";
                      setFile(null);
                      return;
                    } else {
                      setFile(
                        URL.createObjectURL(
                          fileRef.current.files[
                            fileRef.current.files.length - 1
                          ],
                        ),
                      );
                      setPreviewImageDimensions({
                        width: 0,
                        height: 0,
                        multiplier: 1.0,
                      });
                      setShow(true);
                    }
                  }}
                  ref={fileRef}
                  className="hidden"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
                <div className="mt-2.5 flex g-5 justify-center items-center place-items-center">
                  <button
                    className={`${"w-max py-1 px-2.5 text-base flex items-center"} ${"bg-white border-[3px] border-black hover:bg-gray-200"}`}
                    onClick={async () => {
                      await fileRef.current.click();
                    }}
                  >
                    <p>{t("button_select_file")}</p>
                  </button>
                  {file && (
                    <button onClick={() => setShow(!show)}>
                      {show && (
                        <MdIndeterminateCheckBox
                          className="flex items-center w-7.5 h-auto"
                          size={30}
                        />
                      )}
                      {!show && (
                        <MdAddBox
                          className="flex items-center w-7.5 h-auto"
                          size={30}
                        />
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          {mode === "verify" && fanArt && (
            <>
              <h3 className="text-2xl font-bold">
                {t("header_uploaded_file")}
              </h3>
              <div className="h-2.5" />
              <Trans
                t={t}
                i18nKey={"provided_image_p"}
                components={{
                  bold: <span className="font-medium whitespace-nowrap"></span>,
                  paragraph: <p></p>,
                }}
                values={{
                  username: fanArt.uploader.username,
                }}
              />
              <div className="h-2.5" />
              <button
                className={`${"w-max py-1 px-2.5 text-base flex items-center"} ${"bg-white border-[3px] border-black hover:bg-gray-200"}`}
                onClick={() => {
                  setShow(!show);
                }}
              >
                <p>{show ? t("hide_button") : t("show_button")}</p>
              </button>
            </>
          )}
        </div>
        {/*Clasification div */}
        <div className="bg-white border-2 leading-4.5 border-black rounded-lg p-1 w-113 flex flex-col gap-0.5 items-center">
          <h3 className="text-2xl font-bold">
            {t("header_select_clasification")}
          </h3>
          {mode === "upload" && <p>{t("select_clasification_p_one")}</p>}
          <Trans
            t={t}
            i18nKey={"select_clasification_p_two"}
            components={{
              bold: BOLD_CONFIG,
              paragraph: <p></p>,
            }}
          />
          <Trans
            t={t}
            i18nKey={"select_clasification_p_three"}
            components={{
              bold: BOLD_CONFIG,
              paragraph: <p></p>,
            }}
          />
          <Trans
            t={t}
            i18nKey={"select_clasification_p_four"}
            components={{
              bold: BOLD_CONFIG,
              paragraph: <p></p>,
            }}
          />
          {mode === "verify" && <p>{t("select_clasification_p_five")}</p>}
          <select
            value={inputs.clasification}
            onChange={(e) => {
              setInputs({
                ...inputs,
                clasification: e.target.value as
                  | "general"
                  | "sensitive"
                  | "explicit",
              });
            }}
            className={`${"w-max py-1 px-2.5 text-base flex items-center"} ${"bg-white border-[3px] border-black hover:bg-gray-200"}`}
          >
            <option>General</option>
            <option>Sensitive</option>
            <option>Explicit</option>
          </select>
        </div>
        {/*Original Link div */}
        <div className="bg-white border-2 leading-4.5 border-black rounded-lg p-1 w-113 flex flex-col gap-0.5 items-center">
          <h3 className="text-2xl font-bold">{t("header_enter_link")}</h3>
          <p>{t("body_enter_link_p_one")}</p>
          <p>{t("body_enter_link_p_two")}</p>
          <p>{t("body_enter_link_p_three")}</p>
          <div className="flex gap-1.25">
            <input
              className={`${"border-[3px] w-87 p-1.5"} ${!editLink ? "text-gray-400" : ""}`}
              value={inputs.originalLink}
              onChange={(e) =>
                setInputs({ ...inputs, originalLink: e.target.value })
              }
              type="url"
              disabled={!editLink}
            />
            {mode === "verify" && (
              <div
                onClick={() => setEditLink(!editLink)}
                className={`${"flex px-1 items-center border-2 border-black rounded-sm cursor-pointer"} ${editLink ? "bg-black" : ""}`}
              >
                <MdEdit className={editLink ? "text-white" : ""} />
              </div>
            )}
          </div>
        </div>
      </div>
      {message}
    </>
  );
}
