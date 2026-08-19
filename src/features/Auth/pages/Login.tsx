import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUser, FaLock } from "react-icons/fa";
import { LogInput, LogHeader, LogContainer } from "@features";
import {
  SmallMessage,
  Message,
  Profile,
  BlockMessage,
  type withToken,
  type withUserData,
} from "@shared";

export default function Login() {
  const { t, i18n } = useTranslation("auth");
  const location = useLocation();
  const [inputs, setInputs] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [smallMessage, setSmallMessage] = useState<null | ReactNode>(null);
  const [message, setMessage] = useState<null | ReactNode>(null);
  const [blockMessage, setBlockMessage] = useState<null | ReactNode>(null);

  const from = location.state?.from || "/";
  useEffect(() => {
    const callBackend = async (): Promise<void> => {
      const res = (await Profile(
        localStorage.getItem("token"),
      )) as withUserData;
      if (res?.success) {
        setBlockMessage(
          <BlockMessage type="success" message={t("block_message_login")} />,
        );
      }
    };
    callBackend();
  }, []);
  async function handleClick(): Promise<void> {
    try {
    } finally {
    }
    if (inputs.name === "" || inputs.password === "") {
      setSmallMessage(
        <SmallMessage
          type="error"
          message={t("small_message_insufficient_data_login")}
        />,
      );
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("userName", inputs.name);
    formData.append("password", inputs.password);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (!response.ok) {
      if (response.status === 429) {
        setSmallMessage(
          <SmallMessage type="error" message={t("429_error_code")} />,
        );
      }
      return;
    }
    const res = (await response.json()) as withToken;

    if (
      res.code === "LOGIN_SUCCESSFUL" ||
      res.code === "LOGIN_SUCCESSFUL_UNVERIFIED"
    ) {
      setSmallMessage(
        <SmallMessage type="success" message={t("message_body_login")} />,
      );
      setMessage(
        <Message
          header={t("message_header_success")}
          text={
            !blockMessage
              ? t("message_body_login")
              : t("message_body_changed_login")
          }
          type="success"
          setMessage={setMessage}
          toRedirect={res.code === "LOGIN_SUCCESSFUL" ? from : "/auth/validate"}
          previus={{ state: { from: location.pathname } }}
        />,
      );
      localStorage.setItem("token", String(res.token));
      const langResponse = (await Profile(
        localStorage.getItem("token"),
      )) as withUserData;
      i18n.changeLanguage(langResponse.user_data.preferences.language);
    } else {
      setSmallMessage(<SmallMessage type="error" message={t(res.code)} />);
    }
  }
  return (
    <>
      <div className="flex flex-col gap-5 w-96 m-auto min-h-screen pt-20">
        {blockMessage}
        <LogContainer>
          <LogHeader title={t("page_header_login")} />
          <LogInput
            label={t("input_username_label")}
            setInputs={setInputs}
            inputValue={inputs.name}
            inputs={inputs}
            field="name"
            icon={<FaUser className="text-lg" />}
            type="text"
          />
          <LogInput
            label={t("input_password_label")}
            setInputs={setInputs}
            inputValue={inputs.password}
            inputs={inputs}
            field="password"
            icon={<FaLock className="text-lg" />}
            type="password"
          />
          <div className="flex flex-col gap-2.5">
            <Link to={"/auth/changePassword"}>
              <p className="text-blue-700">{t("forgot_password")}</p>
            </Link>
            <Link to={"/auth/create"}>
              <p className="text-blue-700">{t("create_account")}</p>
            </Link>
          </div>

          <button
            className="bg-black hover:bg-pink-700 transition-colors duration-300 cursor-pointer text-white p-1.5 rounded-lg max-w-max m-auto mt-2.5 text-lg"
            onClick={() => {
              if (!loading) {
                handleClick();
              }
            }}
          >
            {t("log_in_button_login")}
          </button>
          {smallMessage}
        </LogContainer>
      </div>

      {message}
    </>
  );
}
