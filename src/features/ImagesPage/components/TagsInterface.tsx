import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { IoIosBrush } from "react-icons/io";
import { BsFillFilePersonFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import {
  SmallMessage,
  TagLabel,
  TagsSearch,
  Message,
  HoverInfo,
  type response,
  type tag,
  type change,
} from "@shared";

type props = {
  fanArtTags: tag[];
  setfanArtTags: React.Dispatch<React.SetStateAction<tag[]>>;
  //For the fan art validation process
  unVerTags?: tag[];
  setUnVerTags?: React.Dispatch<React.SetStateAction<tag[]>>;
  changesRecords?: change[];
  setChangesRecords?: React.Dispatch<React.SetStateAction<change[]>>;
  setDefault?: () => void;
};
export default function TagsInterface({
  fanArtTags,
  setfanArtTags,
  unVerTags,
  setUnVerTags,
  changesRecords,
  setChangesRecords,
  setDefault,
}: props) {
  const { t } = useTranslation("images");
  const [message, setMessage] = useState<null | ReactNode>(null);
  const [inputs, setInputs] = useState<{ search: string; addTag: string }>({
    search: "",
    addTag: "",
  });
  const [addButtonState, setAddButtonState] = useState<
    "general" | "character" | "artist"
  >("general");
  const [smallMessage, setSmallMessage] = useState<ReactNode | null>(null);
  const [errorTag, setErrorTag] = useState<string | null>(null);

  //For validating
  const [showEdit, setShowEdit] = useState("");
  const [nameChange, setNameChange] = useState("");

  //To show span in restart tags
  const [hoverRestart, setHoverRestart] = useState(false);

  async function addTagFromNew(): Promise<void> {
    const added: string = inputs.addTag.trim().replace(" ", "_");
    // Previus validations
    if (inputs.addTag === "") {
      setSmallMessage(
        <SmallMessage
          type="error"
          message={t("small_message_error_no_tag_name")}
        />,
      );
      setTimeout(() => {
        setSmallMessage(null);
      }, 2000);
      return;
    }
    // Checks backend

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tags/check?newTag=${inputs.addTag}`,
    );
    if (!response.ok) {
      if (response.status === 429) {
        setMessage(
          <Message
            header={t("429_error_code")}
            type="error"
            text={t("429_error_code")}
            setMessage={setMessage}
            toRedirect=""
          />,
        );
      }
      return;
    }
    const res = (await response.json()) as response;
    if (!res.success) {
      setSmallMessage(
        <SmallMessage type="error" message={t("TAG_ALREADY_EXISTS")} />,
      );
      setTimeout(() => {
        setSmallMessage(null);
      }, 2000);
      return;
    }

    if (fanArtTags.find((tag) => tag.name === added)) {
      setSmallMessage(
        <SmallMessage
          type="error"
          message={t("small_message_error_already_added")}
        />,
      );
      setTimeout(() => {
        setSmallMessage(null);
      }, 2000);
      return;
    }
    //If this condition is true it means it was added by an admin
    if (setChangesRecords && changesRecords) {
      if (
        changesRecords.find(
          (record) =>
            record.type === "newEliminated" && record.previous === added,
        )
      ) {
        setChangesRecords(
          changesRecords.filter(
            (record) =>
              record.previous !== added || record.type !== "newEliminated",
          ),
        );
      } else {
        setChangesRecords(
          changesRecords.concat({
            type: "newAdded",
            previous: "None",
            actual: added,
            category: addButtonState,
            status: "validating",
          }),
        );
      }
      setfanArtTags(
        fanArtTags.concat({
          name: added,
          category: addButtonState,
          status: "adminAdded",
        } as tag),
      );
    } else {
      //Added by user
      setfanArtTags(
        fanArtTags.concat({
          name: added,
          category: addButtonState,
          status: "pending",
        } as tag),
      );
    }
  }

  function removeTag(tag: tag) {
    //Removes tag
    setfanArtTags(fanArtTags.filter((current) => current.name !== tag.name));
    //(Validation) if was validated but later rejected
    if (setUnVerTags && unVerTags && setChangesRecords && changesRecords) {
      if (tag.status === "validating") {
        //Pass to pendings and adds records
        setUnVerTags(unVerTags.concat({ ...tag, status: "pending" }));
        setChangesRecords(
          changesRecords.filter((current) => current.actual !== tag.name),
        );
      } else if (
        changesRecords.find(
          (record) => record.type === "newAdded" && record.actual === tag.name,
        )
      ) {
        setChangesRecords(
          changesRecords.filter(
            (record) =>
              record.type !== "newAdded" || record.actual !== tag.name,
          ),
        );
      } else if (tag.status === "pending") {
        setUnVerTags(unVerTags.filter((current) => current.name !== tag.name));
        setChangesRecords(
          changesRecords.concat({
            type: "newEliminated",
            previous: tag.name,
            actual: "Eliminated",
            category: tag.category,
            status: "rejected",
          }),
        );
      } else if (tag.status === "accepted") {
        if (
          changesRecords.find(
            (record) => record.type === "added" && record.actual === tag.name,
          )
        ) {
          setChangesRecords(
            changesRecords.filter(
              (record) => record.type !== "added" || record.actual !== tag.name,
            ),
          );
        } else {
          setChangesRecords(
            changesRecords.concat({
              type: "eliminated",
              previous: tag.name,
              actual: "Eliminated",
              category: tag.category,
              status: "rejected",
            }),
          );
        }
      }
    }
  }

  //Validation function
  function acceptTag(tag: tag) {
    if (setUnVerTags && unVerTags && setChangesRecords && changesRecords) {
      setUnVerTags(unVerTags.filter((current) => current.name !== tag.name));
      setChangesRecords(
        changesRecords.concat({
          type: "validated",
          previous: tag.name,
          actual: tag.name,
          category: tag.category,
          status: tag.status,
        }),
      );
      setfanArtTags(fanArtTags.concat({ ...tag, status: "validating" }));
    }
  }

  function changeShowEdit(tag: tag) {
    showEdit === tag.name ? setShowEdit("") : setShowEdit(tag.name);
  }

  async function changeTagName(tag: tag) {
    //Checks if a tag whith that name alrady exist /tags/check
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tags/check?newTag=${nameChange.trim().replace(" ", "_")}`,
    );
    if (!response.ok) {
      if (response.status === 429) {
        setMessage(
          <Message
            header={t("429_error_code")}
            type="error"
            text={t("429_error_code")}
            setMessage={setMessage}
            toRedirect=""
          />,
        );
      }
      return;
    }
    const res = (await response.json()) as response;
    if (!res.success) {
      setMessage(
        <Message
          header={"Error"}
          text={t("TAG_ALREADY_EXISTS")}
          type="error"
          setMessage={setMessage}
          toRedirect=""
        />,
      );
      return;
    }
    if (unVerTags && setUnVerTags && changesRecords && setChangesRecords) {
      const newName = nameChange.trim().replace(" ", "_");
      setUnVerTags((prevTags) =>
        prevTags.map((t) =>
          t.name === tag.name ? { ...t, name: newName } : t,
        ),
      );
      setChangesRecords(
        changesRecords.concat({
          type: "name",
          previous: tag.name,
          actual: newName,
          category: tag.category,
          status: tag.status,
        }),
      );
      setNameChange("");
    }
  }

  const INTERFACE_SECTION = "flex flex-col w-full items-center overflow-scroll";

  return (
    <>
      {message}
      <div className="grid grid-cols-3 bg-white border-[3px] border-black rounded-[5px] h-87.5 bg-[url(data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239f9aa6' fill-opacity='0.55' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E)]">
        <div className={`${"border-black"} ${INTERFACE_SECTION}`}>
          <header className="flex items-center justify-center gap-2.5 pt-5">
            <h3>{t("header_interface_tags_added_tags")}</h3>
            {changesRecords &&
              setDefault &&
              setChangesRecords &&
              changesRecords.length > 0 && (
                <div>
                  <div className="w-max -translate-y-12.5">
                    <HoverInfo
                      info={t("span_restart_tags")}
                      hover={hoverRestart}
                    />
                  </div>
                  <MdRefresh
                    size={24}
                    className="cursor-pointer"
                    onMouseOverCapture={() => setHoverRestart(true)}
                    onMouseOut={() => setHoverRestart(false)}
                    onClick={() => {
                      setDefault();
                      setChangesRecords([]);
                    }}
                  />
                </div>
              )}
          </header>
          <section className="my-7.5 flex flex-wrap gap-2.5 px-3.5">
            {fanArtTags.map((tag, id) => (
              <TagLabel
                key={tag.name || id}
                tag={tag}
                errorTag={errorTag}
                removeTag={removeTag}
              />
            ))}
            {fanArtTags.length === 0 && (
              <p className="opacity-70 text-2xl">
                {t("text_interface_tags_add_tags")}
              </p>
            )}
          </section>
          {unVerTags && setUnVerTags && (
            <>
              <header className="flex items-center justify-center gap-2.5 pt-5">
                <h3>{t("text_interface_tags_unverified_tags")}</h3>
              </header>
              <section className="my-7.5 flex flex-wrap gap-2.5 px-3.5">
                {unVerTags.map((tag, id) => (
                  <div className="relative">
                    <TagLabel
                      key={tag.name || id}
                      tag={tag}
                      errorTag={errorTag}
                      removeTag={removeTag}
                      validation={true}
                      verifiedTag={acceptTag}
                      changeShowEdit={changeShowEdit}
                    />
                    {showEdit === tag.name && (
                      <div className="bg-white p-1.5 absolute translate-y-1 justify-self-center top-full left-0 m-auto border-2 border-black z-10">
                        <p>
                          {t("rename_objetive")} {tag.name}
                        </p>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={nameChange}
                            onChange={(e) => setNameChange(e.target.value)}
                          />
                          <div className="flex items-center cursor-pointer hover:bg-gray-200">
                            <FaCheck
                              className="text-white text-lg"
                              onClick={() => changeTagName(tag)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {unVerTags.length === 0 && (
                  <p className="opacity-70 text-2xl">
                    {t("no_tags_to_validate")}
                  </p>
                )}
              </section>
            </>
          )}
        </div>
        <div
          className={`${"border-black border-r-[3px] border-l-[3px] w-full"} ${INTERFACE_SECTION}`}
        >
          <header>
            <br />
            <h3>{t("header_interface_tags_search_tags")}</h3>
          </header>
          <TagsSearch
            setAddedTags={setfanArtTags}
            addedTags={fanArtTags}
            errorTag={errorTag}
            setErrorTag={setErrorTag}
            numberTags={20}
            changesRecords={changesRecords}
            setChangesRecords={setChangesRecords}
          />
        </div>
        <div className={INTERFACE_SECTION}>
          <header>
            <br />
            <h3>{t("header_interface_tags_add_new_tags")}</h3>
          </header>
          <section>
            <div className="my-7.5 flex gap-6 items-center">
              <button
                className={`${"flex items-center gap-2.5 rounded-lg p-1.5 text-white text-base"} ${"bg-[#305091]"} ${addButtonState === "general" ? "cursor-no-drop opacity-70" : "cursor-pointer"}`}
                onClick={() => setAddButtonState("general")}
              >
                <p>{t("header_interface_tags_button_category_general")}</p>
                <MdInsertPhoto className="text-lg text-white" />
              </button>
              <button
                className={`${"flex items-center gap-2.5 rounded-lg p-1.5 text-white text-base"} ${"bg-[#b144ca]"} ${addButtonState === "artist" ? "cursor-no-drop opacity-70" : "cursor-pointer"}`}
                onClick={() => setAddButtonState("artist")}
              >
                <p>{t("header_interface_tags_button_category_artist")}</p>
                <IoIosBrush className="text-lg text-white" />
              </button>
              <button
                className={`${"flex items-center gap-2.5 rounded-lg p-1.5 text-white text-base"} ${"bg-[#c72d2d]"} ${addButtonState === "character" ? "cursor-no-drop opacity-70" : "cursor-pointer"}`}
                onClick={() => setAddButtonState("character")}
              >
                <p>{t("header_interface_tags_button_category_character")}</p>
                <BsFillFilePersonFill className="text-white text-lg" />
              </button>
            </div>
            <div className="flex flex-col gap-2.5 items-center">
              <input
                type="text"
                className="flex m-auto border-[3px] border-black text-2xl p-1"
                value={inputs.addTag}
                onChange={(e) =>
                  setInputs({ addTag: e.target.value, search: inputs.search })
                }
              />
              <button
                className="bg-black cursor-pointer text-white p-3 rounded-lg w-max text-lg hover:bg-[#3e3e3e]"
                onClick={addTagFromNew}
              >
                {t("header_interface_tags_button_add_new_tag")}{" "}
                {addButtonState === "general" && t("button_add_tag_general")}
                {addButtonState === "artist" && t("button_add_tag_artist")}
                {addButtonState === "character" &&
                  t("button_add_tag_character")}
              </button>
              {smallMessage}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
