import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
type props = {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleVerify: (value: string) => void;
  position?: "validateCode" | "resend" | "chaneEmail" | null;
  smallMessage: null | ReactNode;
  header?: string;
  buttonLabel?: string;
};
export default function ValidateInput({
  verificationCode,
  setVerificationCode,
  loading,
  handleVerify,
  position = "validateCode",
  smallMessage,
  header = "input_label_verification_code",
  buttonLabel = "button_validate_account",
}: props) {
  const { t } = useTranslation("auth");
  return (
    <section className="grid place-items-center">
      <p className="text-3xl font-medium w-max mt-3">{t(header)}</p>
      <div className="mt-2 flex gap-2 items-center w-max">
        <input
          className="w-full lg:w-80 rounded-sm focus:border-pink-600 p-1 text-black bg-white border-black border-2"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          type="text"
        />
        <button
          className="bg-gray-700 border-gray-700 text-white p-1.5 rounded-lg max-w-max cursor-pointer text-lg lg:text-xl hover:bg-pink-700 transition-colors"
          onClick={() => {
            if (!loading) {
              handleVerify(verificationCode);
            }
          }}
        >
          {t(buttonLabel)}
        </button>
      </div>

      <img
        className="h-32 w-36"
        src="/staticImgs/generalUse/kfc-kfcyuyuko.gif"
        style={{
          display: loading && position === "validateCode" ? "block" : "none",
        }}
      />

      {position === "validateCode" && smallMessage}
    </section>
  );
}
