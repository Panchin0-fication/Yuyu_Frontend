import { useEffect, useState, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TagsInterface, FieldsFanArt, PreviewImage } from "@features";
import { HeaderPages, InfoMessage, Message, TagLabel } from "@shared";
import type {
  response,
  fanArtReducedQuality,
  fanArt,
  tag,
  change,
  fieldsFanArtsInput,
} from "@shared";
import { MdArrowForward, MdCheck, MdClose } from "react-icons/md";
export default function ValidateFanArts() {
  const { t } = useTranslation("images");
  const location = useLocation();

  const [message, setMessage] = useState<null | ReactNode>();
  const fanArt: fanArt = location.state.fanArt;

  const [show, setShow] = useState(false);
  const [fields, setFields] = useState<fieldsFanArtsInput>({
    clasification: fanArt.clasification,
    originalLink: fanArt.originalLink,
  });
  //Verified tags
  const [fanArtTags, setFanArtTags] = useState<tag[]>([]);
  //Unverified tags
  const [unVerTags, setUnVerTags] = useState<tag[]>([]);
  //Recornds of changes
  const [changesRecords, setChangesRecords] = useState<change[]>([]);

  const reducedData: fanArtReducedQuality = location.state.reduced;

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const ALLOWED_DOMAINS = [
    "twitter.com",
    "x.com",
    "pixiv.net",
    "reddit.com",
    "deviantart.com",
    "instagram.com",
  ];

  if (reducedData) {
    useEffect(() => {
      setDimensions({
        height: reducedData.height / 3,
        width: reducedData.width / 3,
      });
    }, []);
  }

  // Set the default tags (added by the user) of the fanart
  function setDefault() {
    setUnVerTags(location.state.pending);
    setFanArtTags(location.state.verified);
  }

  useEffect(() => {
    setDefault();
  }, []);

  useEffect(() => {
    console.log("Records: ", changesRecords);
  }, [changesRecords]);

  function getAdminTags(): ReactNode {
    //Gets all the tags added by the admin
    const addedByAdmin = changesRecords
      .filter((change) => change.type === "newAdded")
      .map((tag) => tag.actual);

    const findTags = fanArtTags
      .filter((tag) => addedByAdmin.includes(tag.name))
      .map((current) => (
        <TagLabel key={current.name} tag={current} errorTag={""} />
      ));
    return <div className="items-center flex gap-2.5">{findTags}</div>;
  }

  function getAddedTags(): ReactNode {
    //Gets the tags added by the TagSearch to the FanArts
    const addedTags = changesRecords
      .filter((change) => change.type === "added")
      .map((change) => change.actual);
    const findTags = fanArtTags
      .filter((tag) => addedTags.includes(tag.name))
      .map((current) => (
        <TagLabel key={current.name} tag={current} errorTag={""} />
      ));
    return <div className="items-center flex gap-2.5">{findTags}</div>;
  }

  function eliminatedTags() {
    //Get the eliminated validated tags from the fanArt
    const eliminatedTags: tag[] = changesRecords
      .filter((change) => change.type === "eliminated")
      .map((change) => ({
        name: change.previous,
        category: change.category,
        status: change.status,
      })) as tag[];
    const findTags = eliminatedTags.map((current) => (
      <TagLabel key={current.name} tag={current} errorTag={""} />
    ));
    return <div className="items-center flex gap-2.5">{findTags}</div>;
  }

  function getNewEliminatedTags() {
    const eliminatedNewTags: tag[] = changesRecords
      .filter((change) => change.type === "newEliminated")
      .map((change) => ({
        name: change.previous,
        category: change.category,
        status: change.status,
      })) as tag[];
    const findTags = eliminatedNewTags.map((current) => (
      <TagLabel key={current.name} tag={current} errorTag={""} />
    ));
    return <div className="items-center flex gap-2.5">{findTags}</div>;
  }

  function renamedTags(): ReactNode {
    //Gets all the renamed tags
    const previus: tag[] = changesRecords
      .filter((change) => change.type === "name")
      .map((tag) => ({
        name: tag.previous,
        category: tag.category,
        status: tag.status,
      })) as tag[];
    const actual: tag[] = changesRecords
      .filter((change) => change.type === "name")
      .map((tag) => ({
        name: tag.actual,
        category: tag.category,
        status: tag.status,
      })) as tag[];

    var toReturn: ReactNode[] = [];
    for (var i = 0; i < actual.length; i++) {
      toReturn.push(
        <div className="items-center flex gap-2.5">
          <TagLabel tag={previus[i]} errorTag={""} />
          <MdArrowForward size={24} />
          <TagLabel tag={actual[i]} errorTag={""} />
        </div>,
      );
    }
    return <div className="items-center flex gap-2.5">{toReturn}</div>;
  }

  function getToValidate() {
    const toValidate = changesRecords
      .filter(
        (changes) =>
          changes.type === "newAdded" || changes.type === "validated",
      )
      .map((changes) => changes.actual);
    const findTags = fanArtTags
      .filter((tag) => toValidate.includes(tag.name))
      .map((current) => (
        <TagLabel key={current.name} tag={current} errorTag={""} />
      ));
    return <div className="items-center flex gap-2.5">{findTags}</div>;
  }

  async function validateFanart(): Promise<void> {
    setMessage(
      <InfoMessage
        header={"FanArt a validar"}
        onCancel={() => setMessage(null)}
        onContinue={() => updateFanArt()}
      >
        {changesRecords.length >= 1 && (
          <>
            <h2>{t("message_changes_record_h2")}</h2>
            {/*Added tags by the admin*/}
            {changesRecords.find((change) => change.type === "newAdded") && (
              <>
                <p>{t("message_new_tags_added_by_admin")}</p> {getAdminTags()}
              </>
            )}
            {/*Added tags by search tags */}
            {changesRecords.find((change) => change.type === "added") && (
              <>
                <p>{t("message_accepted_added_tags")}</p>
                {getAddedTags()}
              </>
            )}

            {changesRecords.filter((change) => change.type === "name").length >=
              1 && (
              <>
                <p>{t("message_edited_tags")}</p> {renamedTags()}
              </>
            )}
            {changesRecords.filter((change) => change.type === "eliminated")
              .length >= 1 && (
              <>
                <p>{t("message_eliminated_tags")}</p>
                {eliminatedTags()}
              </>
            )}
            {changesRecords.find(
              (change) => change.type === "newEliminated",
            ) && (
              <>
                <p>{t("message_pending_eliminated_tags")}</p>
                {getNewEliminatedTags()}
              </>
            )}
            {changesRecords.find(
              (change) =>
                change.type === "validated" || change.type === "newAdded",
            ) && (
              <>
                <p>{t("message_tags_to_validate")}</p>
                {getToValidate()}
              </>
            )}
          </>
        )}
        {changesRecords.length <= 0 && <h2>{t("message_no_changes")}</h2>}
        <h2>{t("message_to_validate")}</h2>
        <p>{t("message_validate_actions")}</p>
      </InfoMessage>,
    );
  }

  async function updateFanArt(): Promise<void> {
    //Send the new tags to validate
    const validatedTags = fanArtTags.filter(
      (tag) => tag.status === "validating" || tag.status === "adminAdded",
    );

    var queryString: String;
    if (
      changesRecords.filter(
        (change) => change.type === "name" || change.type === "newEliminated",
      ).length >= 1
    ) {
      queryString = changesRecords
        .filter(
          (change) => change.type === "name" || change.type === "newEliminated",
        )
        .map((change) => `toDelete=${encodeURIComponent(change.previous)}`)
        .join("&");
    } else {
      queryString = `toDelete=${encodeURIComponent("NONENONENONE")}`;
    }

    const responseNewTags = await fetch(
      `${import.meta.env.VITE_API_URL}/fanArt/tags/validation?${queryString}`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(validatedTags),
      },
    );
    if (!responseNewTags.ok) {
      if (responseNewTags.status === 429) {
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
    const resNewTags = (await responseNewTags.json()) as response;
    if (!resNewTags.success) {
      console.log("Error");
      return;
    }
    //Build body of the fanArt
    var fanArtObject = fanArt;

    fanArtObject["tags"] = fanArtTags
      .filter((tag) => tag.category === "general")
      .map((tag) => tag.name);
    fanArtObject["artists"] = fanArtTags
      .filter((tag) => tag.category === "artist")
      .map((tag) => tag.name);
    fanArtObject["caracters"] = fanArtTags
      .filter((tag) => tag.category === "character")
      .map((tag) => tag.name);
    fanArtObject["clasification"] = fields.clasification;
    fanArtObject["originalLink"] = fields.originalLink;
    fanArtObject["status"] = "accepted";

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/fanArt/validate`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(fanArtObject),
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
    setMessage(
      <Message
        type={res.success ? "success" : "error"}
        header={
          res.success
            ? t("message_header_fan_art_validation")
            : t("UNEXPECTED_ERROR")
        }
        text={t(res.code)}
        setMessage={setMessage}
        toRedirect="/fanArts/toValidate"
      />,
    );
  }

  function validateButton(): void {
    // %% Validations
    if (unVerTags.length >= 1) {
      setMessage(
        <InfoMessage
          header={t("message_header_error_validating")}
          onCancel={() => setMessage(null)}
          onContinue={() => setMessage(null)}
        >
          <h2>{t("message_unverified_tags_h2")}</h2>
          <p>{t("message_validation_error_info")}</p>
          <p>{t("message_unverified_tags_p")}</p>
          <div className="items-center flex gap-2.5">
            {unVerTags.map((tag) => (
              <TagLabel key={tag.name} tag={tag} errorTag={""} />
            ))}
          </div>
        </InfoMessage>,
      );
      return;
    }
    // No yuyuko tag
    if (
      fanArtTags.filter((tag) => tag.name === "saigyouji_yuyuko").length < 1
    ) {
      setMessage(
        <InfoMessage
          header={t("message_header_error_validating")}
          onCancel={() => setMessage(null)}
          onContinue={() => setMessage(null)}
        >
          <h2>{t("message_no_yuyuko_h2")}</h2>
          <p>{t("message_validation_error_info")}</p>
          <p>{t("message_no_yuyuko_p")}</p>
        </InfoMessage>,
      );
      return;
    }
    // URL validation
    let url: URL;
    try {
      url = new URL(fields.originalLink);
    } catch {
      setMessage(
        <InfoMessage
          header={t("message_header_error_validating")}
          onCancel={() => setMessage(null)}
          onContinue={() => setMessage(null)}
        >
          <h2>{t("message_invalid_link_h2")}</h2>
          <p>{t("message_validation_error_info")}</p>
          <p>{t("message_body_error_posting_no_link")}</p>
        </InfoMessage>,
      );
      return;
    }
    const isDomainAllowed = ALLOWED_DOMAINS.some((domain) =>
      url.hostname.endsWith(domain),
    );
    // Check and allow direct link to images
    const isDirectImage = /\.(jpeg|jpg|png|webp|gif)(\?.*)?$/i.test(
      url.pathname,
    );
    if (!isDomainAllowed && !isDirectImage) {
      setMessage(
        <InfoMessage
          header="Error al validar"
          onCancel={() => setMessage(null)}
          onContinue={() => setMessage(null)}
        >
          <h2>{t("message_invalid_site_h2")}</h2>
          <p>{t("message_validation_error_info")}</p>
          <p>{t("message_body_error_posting_unauthorized_domain")}</p>
          <p>
            {t("message_invalid_site_p")}{" "}
            {ALLOWED_DOMAINS.map((domain) => (
              <span key={domain}>{domain} </span>
            ))}
          </p>
        </InfoMessage>,
      );
      return;
    }

    // %% Warnings
    // No artist tag
    var continueValidation = true;
    if (fanArtTags.filter((tag) => tag.category === "artist").length < 1) {
      continueValidation = false;
      setMessage(
        <InfoMessage
          header={t("info_message_no_artist_header")}
          onCancel={() => setMessage(null)}
          onContinue={() => validateFanart()}
        >
          <h2>{t("info_message_no_artist_h2")}</h2>
          <p>{t("info_message_no_artist_p_one")}</p>
          <p>{t("info_message_no_artist_p_two")}</p>
        </InfoMessage>,
      );
    }
    if (continueValidation) validateFanart();
  }

  const incorrectLinkRef = useRef(false);
  const lowResolutionRef = useRef(false);
  const artistIssueRef = useRef(false);
  const noYuyukoRef = useRef(false);
  function rejectButton() {
    incorrectLinkRef.current = false;
    lowResolutionRef.current = false;
    artistIssueRef.current = false;
    noYuyukoRef.current = false;
    setMessage(
      <InfoMessage
        header={t("reject_fan_art_header")}
        onCancel={() => setMessage(null)}
        onContinue={() => {
          if (
            incorrectLinkRef.current ||
            lowResolutionRef.current ||
            artistIssueRef.current ||
            noYuyukoRef.current
          )
            rejectFanart();
        }}
      >
        <h2>{t("reject_fan_art_subheader")}</h2>
        <div className="items-center flex gap-2.5">
          <input
            onChange={() => {
              incorrectLinkRef.current = !incorrectLinkRef.current;
            }}
            type="checkbox"
          />
          <p>{t("reject_fan_art_incorrect_link_p")}</p>
        </div>
        <div className="items-center flex gap-2.5">
          <input
            onChange={() => {
              lowResolutionRef.current = !lowResolutionRef.current;
            }}
            type="checkbox"
          />
          <p>{t("reject_fan_art_low_resolution_p")}</p>
        </div>
        <div className="items-center flex gap-2.5">
          <input
            onChange={() => (artistIssueRef.current = !artistIssueRef.current)}
            type="checkbox"
          />
          <p>{t("reject_fan_art_artist_p")}</p>
        </div>
        <div className="items-center flex gap-2.5">
          <input
            onChange={() => (noYuyukoRef.current = !noYuyukoRef.current)}
            type="checkbox"
          />
          <p>{t("reject_fan_art_no_yuyuko_p")}</p>
        </div>
      </InfoMessage>,
    );
  }

  async function rejectFanart() {
    const rejectMotivesObject = {
      FanArtId: fanArt.id,
      incorrectLink: incorrectLinkRef.current,
      lowResolution: lowResolutionRef.current,
      artistIssue: artistIssueRef.current,
      noYuyuko: noYuyukoRef.current,
    };

    var fanArtTags = fanArt.tags.concat(fanArt.caracters, fanArt.artists);
    var queryString: String = fanArtTags
      .map((tag) => `toDelete=${encodeURIComponent(tag)}`)
      .join("&");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/fanArt/reject?${queryString}`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(rejectMotivesObject),
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
    setMessage(
      <Message
        type={res.success ? "success" : "error"}
        header={
          res.success
            ? t("message_header_fan_art_reject")
            : t("UNEXPECTED_ERROR")
        }
        text={res.success ? t(res.code) : t("UNEXPECTED_ERROR")}
        setMessage={setMessage}
        toRedirect="/fanArts/toValidate"
      />,
    );
  }

  return (
    <div className="min-h-screen mx-auto px-2.5">
      <HeaderPages
        image="/staticImgs/generalUse/__saigyouji_yuyuko_touhou_drawn_by_y75zei__sample-9f89b813ebba2f314ea98108f9069cda.png"
        header={t("header_validate_fanart")}
      />
      <br />
      <FieldsFanArt
        mode="verify"
        show={show}
        setShow={setShow}
        inputs={fields}
        setInputs={setFields}
        fanArt={fanArt}
      />
      <PreviewImage
        closeFunc={() => setShow(false)}
        increaseFunc={() =>
          setDimensions({
            height: dimensions.height * 1.05,
            width: dimensions.width * 1.05,
          })
        }
        decreaseFunc={() =>
          setDimensions({
            height: dimensions.height * 0.95,
            width: dimensions.width * 0.95,
          })
        }
        show={show}
        dimensions={dimensions}
        fanArt={fanArt}
      />
      <br />
      <TagsInterface
        fanArtTags={fanArtTags}
        setfanArtTags={setFanArtTags}
        unVerTags={unVerTags}
        setUnVerTags={setUnVerTags}
        changesRecords={changesRecords}
        setChangesRecords={setChangesRecords}
        setDefault={setDefault}
      />
      <div className="flex gap-5 justify-center pt-3.75 pb-2.5">
        <button
          onClick={validateButton}
          className="bg-[#e83ea9] transition-colors duration-300 hover:bg-[#cd1589] flex gap-2.5 items-center text-white p-2.25 rounded-2.5"
        >
          <p className="text-[24px]">{t("validate_fan_art_button")}</p>
          <MdCheck size={24} className="text-white" />
        </button>
        <button
          onClick={rejectButton}
          className="bg-[#dc2a2a] hover:bg-[#830a0a] flex gap-2.5 items-center text-white p-2.25 rounded-2.5"
        >
          <p className="text-[24px]">{t("reject_fan_art_button")}</p>
          <MdClose size={24} className="text-white" />
        </button>
        {message}
      </div>
    </div>
  );
}
