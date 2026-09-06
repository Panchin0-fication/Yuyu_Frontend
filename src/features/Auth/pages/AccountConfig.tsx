import { useEffect, useState, type ReactNode } from "react";
import { LogHeader } from "@features";
import {
  ValidateSesion,
  TagsSearch,
  Message,
  TagLabel,
  type tag,
  type userData,
  type preferences,
  type response,
  type simpleTag,
  type MyOption,
} from "@shared";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import Select, { type StylesConfig } from "react-select";

export default function AccountConfig() {
  const { t, i18n } = useTranslation("auth");
  const [userData, setUserData] = useState<userData | null>(null);
  const [originalPref, setOriginalPref] = useState<preferences | null>(null);
  const [showConfigs, setShowConfigs] = useState({
    language: false,
    hideTags: false,
    showExplicit: false,
  });
  const [errorTag, setErrorTag] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | undefined>("en");
  const [hideTags, setHideTags] = useState<tag[]>([]);
  const [auxTag, setAuxTag] = useState<null | simpleTag[]>(null);
  const [loading, setLoading] = useState(false);
  const [explicitBox, setExplicitBox] = useState(false);
  const [message, setMessage] = useState<ReactNode | null>(null);

  //Sets the original preferences
  useEffect(() => {
    if (!userData) return;
    setOriginalPref(userData.preferences);
    setLanguage(userData.preferences.language);
    setAuxTag(userData.preferences.hideTags);
    //Map it
    var mapedTags: tag[] = userData.preferences.hideTags.map((tag: any) => ({
      ...tag,
      status: "accepted",
    }));
    setHideTags(mapedTags);
    setExplicitBox(userData.preferences.showExplicit ?? false);
  }, [userData]);

  useEffect(() => {
    var simpleTags = hideTags;
    simpleTags.map((tag: any) => {
      delete tag["status"];
    });
    setAuxTag(simpleTags);
  }, [hideTags]);
  function removeTag(tag: tag): void {
    setHideTags(hideTags.filter((current) => current.name !== tag.name));
  }

  async function changePreferences(): Promise<void> {
    setLoading(true);
    var newPreferences = {} as preferences;
    var tagSimple: any = hideTags;
    tagSimple.map((tag: any) => {
      delete tag["status"];
    });

    newPreferences["hideTags"] = tagSimple;
    newPreferences["language"] = language as string;
    newPreferences["showExplicit"] = explicitBox;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/preferences`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newPreferences),
      },
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
    if (res.success) {
      setMessage(
        <Message
          header={
            res.success
              ? t("message_changes_preferences")
              : t("UNEXPECTED_ERROR")
          }
          text={t(res.code)}
          type="error"
          setMessage={setMessage}
          toRedirect=""
        />,
      );
      i18n.changeLanguage(language);
    }
    setLoading(false);
  }

  const options = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ];

  const customStyles: StylesConfig<MyOption, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: "gray",
      boxShadow: "none",
      borderWidth: 2,
      borderRadius: 0,
      "&:hover": {
        borderColor: "black",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(232, 62, 169)" : "white",
      "&:hover": {
        borderColor: state.isSelected ? "rgb(232, 62, 169)" : "pink",
      },
    }),
  };

  const SECTION_CONFIG = "bg-white border-black border-2 p-1";
  const SECTION_CONFIG_H = "flex cursor-pointer items-center";
  const SECTION_CONFIG_H2 = "text-2xl font-normal";
  const CONTENT_CONFIG = "pl-2.5 pr-2.5 pt-1";

  return (
    <>
      <ValidateSesion setUserData={setUserData} />
      {message}
      <div className="min-h-screen pb-5">
        <br />
        <br />
        <br />
        <div className="flex gap-2.5 flex-col bg-white rounded-lg border-white border-2 w-[85vw] lg:w-xl p-5 m-auto ">
          <LogHeader title={t("configuration_header")}></LogHeader>
          <p className="text-xl pl-1 font-normal">
            {t("current_user_label")}
            <span className="font-normal p-1">{userData?.userName}</span>
          </p>
          {/*Language*/}
          <section className={SECTION_CONFIG}>
            <header
              className={SECTION_CONFIG_H}
              onClick={() =>
                setShowConfigs({
                  ...showConfigs,
                  language: !showConfigs.language,
                })
              }
            >
              <h2 className={SECTION_CONFIG_H2}>{t("languaje_header")}</h2>
              <IoMdArrowDropdown
                className={`${"text-2xl"} ${showConfigs.language ? "rotate-180" : ""}`}
              />
            </header>

            <div
              className={`${CONTENT_CONFIG} ${"flex items-center gap-3.5"}`}
              style={{
                display: showConfigs.language ? "flex" : "none",
              }}
            >
              <p className={"text-lg"}>{t("current_language")}</p>
              <Select
                styles={customStyles}
                value={options.find((opt) => opt.value === language) || null}
                options={options}
                onChange={(value) => setLanguage(value?.value)}
              ></Select>
            </div>
          </section>
          {/*Hide tags*/}
          <section className={`${SECTION_CONFIG}`}>
            <header
              className={SECTION_CONFIG_H}
              onClick={() =>
                setShowConfigs({
                  ...showConfigs,
                  hideTags: !showConfigs.hideTags,
                })
              }
            >
              <h2 className={SECTION_CONFIG_H2}>{t("hide_tags_header")}</h2>
              <IoMdArrowDropdown
                className={`${"text-2xl"} ${showConfigs.hideTags ? "rotate-180" : ""}`}
              />
            </header>

            <div
              className={`${CONTENT_CONFIG} ${"flex flex-col gap-1"}`}
              style={{
                display: showConfigs.hideTags ? "flex" : "none",
              }}
            >
              <p className="text-lg">{t("hide_tags_current")}</p>
              <div className="bg-white border-2 border-black flex gap-1 p-2.5 flex-wrap">
                {hideTags.length === 0 && (
                  <p className="text-[#656565]  p-1 flex gap-1">
                    {t("hide_tags_current_empty")}
                  </p>
                )}
                {hideTags.map((tag, id) => (
                  <TagLabel
                    key={tag.name || id}
                    tag={tag}
                    errorTag={errorTag}
                    removeTag={removeTag}
                  />
                ))}
              </div>
              <h2 className="m-auto">{t("hide_tags_search")}</h2>
              <TagsSearch
                numberTags={10}
                addedTags={hideTags}
                setAddedTags={setHideTags}
                errorTag={errorTag}
                setErrorTag={setErrorTag}
              />
            </div>
          </section>
          {/*Show explicit*/}
          <section className={SECTION_CONFIG}>
            <header
              className={SECTION_CONFIG_H}
              onClick={() =>
                setShowConfigs({
                  ...showConfigs,
                  showExplicit: !showConfigs.showExplicit,
                })
              }
            >
              <h2 className={SECTION_CONFIG_H2}>{t("show_explicit_header")}</h2>
              <IoMdArrowDropdown
                className={`${"text-2xl"} ${showConfigs.showExplicit ? "rotate-180" : ""}`}
              />
            </header>

            <div
              className={`${CONTENT_CONFIG}`}
              style={{
                display: showConfigs.showExplicit ? "block" : "none",
              }}
            >
              <div className="flex gap-2.5 ">
                <p className="text-xl">{t("show_explicit_label")}</p>
                <input
                  checked={explicitBox}
                  className="text-black bg-white border-black border-2"
                  onChange={() => setExplicitBox(!explicitBox)}
                  type="checkbox"
                />
              </div>
              <p className="text-lg">
                {explicitBox
                  ? t("show_explicit_info_yes")
                  : t("show_explicit_info_no")}
              </p>
            </div>
          </section>
          <button
            className="bg-pink-600 text-white w-max py-2 px-1 cursor-pointer font-medium text-xl lg:text-2xl rounded-sm m-auto hover:bg-pink-800"
            onClick={() => {
              if (
                (originalPref?.hideTags !== auxTag ||
                  originalPref?.language !== language ||
                  originalPref?.showExplicit !== explicitBox) &&
                !loading
              ) {
                changePreferences();
              }
            }}
          >
            {t("show_explicit_button")}
          </button>
        </div>
      </div>
    </>
  );
}
