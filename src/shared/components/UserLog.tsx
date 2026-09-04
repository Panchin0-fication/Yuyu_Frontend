import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Profile, InfoMessage, type withUserData } from "@shared";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";

export default function UserLog() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [username, setUsername] = useState<null | string>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [optionHover, setOptionHover] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      const res = (await Profile(
        localStorage.getItem("token"),
      )) as withUserData;

      if (res.success) {
        setUsername(res.user_data.userName);
      }
    };
    getUsername();
  }, []);

  function goToLogin() {
    navigate("/auth/login");
  }
  return (
    <>
      <div className={showInfo ? "block" : "hidden"}>
        <InfoMessage
          header={t("log_info_header")}
          onCancel={() => setShowInfo(false)}
          onContinue={() => navigate("/auth/create")}
        >
          <h2>{t("log_info_h2_one")}</h2>
          <p>{t("log_info_p_one")}</p>
          <ul>
            <li>{t("log_info_li_one")}</li>
            <li>{t("log_info_li_two")}</li>
            <li>{t("log_info_li_three")}</li>
          </ul>
          <h2>{t("log_info_h2_two")}</h2>
          <p>{t("log_info_p_two")}</p>
          <p>{t("log_info_p_three")}</p>
        </InfoMessage>
      </div>
      <div className="m-auto">
        <div
          className={`${"absolute flex flex-col gap-0.5 p-0.5 bg-gray-600 -translate-y-25"} ${showOptions ? "flex" : "hidden"}`}
          onMouseOut={() => setOptionHover("")}
        >
          {!username && 
          
          <span
            className={`${optionHover === "login" ? "bg-blue-500" : "bg-black"} ${"text-white text-lg px-2 cursor-pointer"}`}
            onMouseOver={() => setOptionHover("login")}
            onClick={goToLogin}
          >
            {t("log_login_button")}
          </span>}

          {username && <span
            className={`${optionHover === "close" ? "bg-blue-500" : "bg-black"} ${"text-white text-lg px-2 cursor-pointer"}`}
            onMouseOver={() => setOptionHover("close")}
            onClick={()=>{
              localStorage.removeItem("token"); 
              location.reload();
            }}
          >
            {t("log_logout_button")}
          </span>}
          
          <span
            className={`${optionHover === "config" ? "bg-blue-500" : "bg-black"} ${"text-white text-lg px-2 cursor-pointer"}`}
            onMouseOver={() => setOptionHover("config")}
            onClick={() => navigate("/auth/accountConfig")}
          >
            {t("log_config_button")}
          </span>
          {!username && 
          <span
            className={`${optionHover === "info" ? "bg-blue-500" : "bg-black"} ${"text-white text-lg px-2 cursor-pointer"}`}
            onMouseOver={() => setOptionHover("info")}
            onClick={() => setShowInfo(true)}
          >
            {t("log_info_button")}
          </span>}

          
        </div>

        <div
          className="flex gap-2.5 items-center cursor-pointer text-2xl "
          onClick={() => setShowOptions(!showOptions)}
        >
          <MdPerson className="text-2xl text-black" />
          {username ? (
            <p>{username}</p>
          ) : (
            <p className="leading-1 text-2xl text-black">
              {t("log_not_loged_name")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
