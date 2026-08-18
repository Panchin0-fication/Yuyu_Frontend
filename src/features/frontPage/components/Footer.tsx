import { useTranslation, Trans } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation("home");

  const LINK =
    "text-blue-500 cursor-pointer text-shadow-[-1px_-1px_0_#ffffff,1px_-1px_0_#ffffff,-1px_1px_0_#ffffff,1px_1px_0_#ffffff]";
  return (
    <>
      <div className="font-merri bg-[url(/public/staticImgs/generalUse/__remilia_scarlet_and_saigyouji_yuyuko_touhou_drawn_by_mero_starfish_jcs__sample-bd3ed144e95dce49380e4f20cc664741e.jpg)] bg-cover bg-center h-40 min-w-11/12 pt-2.5 pl-3.5 mt-7">
        <h2 className=" text-white text-5xl font-extrabold text-shadow-[-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000]">
          {t("footer_header")}
        </h2>
        <p className="text-white text-shadow-[-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000] text-2xl font-medium">
          <Trans
            t={t}
            i18nKey="footer_body"
            components={{
              mail: <strong className={LINK} />,
              github: (
                <a
                  href="https://github.com/Panchin0-fication"
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                />
              ),
            }}
          />
        </p>
      </div>
      <br />
    </>
  );
}
