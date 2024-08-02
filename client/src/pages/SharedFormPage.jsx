/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";
import styles from "./SharedFormPage.module.css";
import { icon } from "../data/fileImports";
import sendIcon from "/assets/icons/send.svg";

const SharedFormPage = () => {
  const { getSharedLinkUserDetails, addNewuserToSharedlink } =
    useAuthentication();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [randomId, setRandomId] = useState("");
  const [sharedLink, setSharedLink] = useState("");
  const [rating, setRating] = useState(0);
  const [submittedFields, setSubmittedFields] = useState({});

  const { addUserInputsToSharedLink } = useAuthentication();

  // Extract form details from shared link data
  const formDetails =
    getSharedLinkUserDetails.data?.data?.sharedLinkDetails.formDetails || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const latestElementRef = useRef(null);

  useEffect(() => {
    // Generate a random ID when the component mounts
    if (!randomId) {
      const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
      };
      setRandomId(generateRandomId());

      setSharedLink(window.location.href);
    }

    // Set the shared link
    const link = window.location.href;

    if (currentIndex < formDetails.length) {
      const timer = setTimeout(() => {
        if (formDetails[currentIndex].inputType === "Input") {
          setWaitingForInput(true);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1000); // Show each bubble/input after 1 second

      return () => clearTimeout(timer);
    }
  }, [currentIndex, formDetails]);

  useEffect(() => {
    if (randomId)
      addNewuserToSharedlink.mutate({
        sharedLink: window.location.href,
        RandomId: randomId,
      });
  }, [randomId]);

  useEffect(() => {
    if (latestElementRef.current) {
      latestElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex, waitingForInput]);

  const handleUserInput = async (data) => {
    const currentDetail = formDetails[currentIndex];

    addUserInputsToSharedLink.mutate({
      sharedLink,
      randomId,
      formInput: {
        name: currentDetail.name,
        userResponse: data[currentDetail.name] || rating,
        completionStatus: true,
      },
    });

    setUserResponses((prev) => ({
      ...prev,
      [currentDetail.name]: data[currentDetail.name] || rating,
    }));

    setSubmittedFields((prev) => ({
      ...prev,
      [currentDetail.name]: true,
    }));

    setWaitingForInput(false);
    setCurrentIndex(currentIndex + 1); // Move to the next item
    setRating(0); // Reset rating after submission
  };

  const renderBubble = (detail) => {
    let content;
    if (detail.type === "image") {
      content = (
        <img
          src={detail.showValue}
          alt={detail.name}
          style={{ maxWidth: "100%" }}
        />
      );
    } else if (detail.type === "video") {
      content = (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={detail.showValue} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (detail.type === "gif") {
      content = (
        <img
          src={detail.showValue}
          alt={detail.name}
          style={{ maxWidth: "100%" }}
        />
      );
    } else {
      content = detail.showValue;
    }

    return (
      <div
        key={detail._id}
        className={styles.bubbles_container}
        ref={
          currentIndex === formDetails.indexOf(detail) ? latestElementRef : null
        }
      >
        <div className={styles.icon}>
          <img src={icon} alt="icon" />
        </div>
        <div className={styles.bubbles}>{content}</div>
      </div>
    );
  };

  const renderRatingInput = (name) => {
    const handleRatingClick = (value) => {
      setRating(value);
      setValue(name, value); // Register the value with react-hook-form
    };

    const isSubmitted = submittedFields[name];

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        {[1, 2, 3, 4, 5].map((circle) => (
          <div
            key={circle}
            onClick={() => !isSubmitted && handleRatingClick(circle)}
            style={{
              cursor: isSubmitted ? "default" : "pointer",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isSubmitted
                ? circle <= userResponses[name]
                  ? "blue"
                  : "orange"
                : circle <= rating
                ? "gold"
                : "gray",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {circle}
          </div>
        ))}
        <input
          type="hidden"
          value={rating}
          {...register(name, {
            required: "This field is required",
          })}
        />
      </div>
    );
  };

  const renderInput = (detail) => {
    const inputType = detail.type;

    const getInputField = (inputType) => {
      switch (inputType) {
        case "text":
          return "text";
        case "date":
          return "date";
        case "email":
          return "email";
        case "number":
          return "number";
        case "phone":
          return "tel";
        default:
          return "text";
      }
    };

    const isSubmitted = submittedFields[detail.name];

    return (
      <div
        key={detail._id}
        className={styles.inputs}
        ref={
          currentIndex === formDetails.indexOf(detail) ? latestElementRef : null
        }
      >
        <form onSubmit={handleSubmit(handleUserInput)} className={styles.form}>
          {inputType === "rating" ? (
            renderRatingInput(detail.name)
          ) : (
            <input
              type={getInputField(inputType)}
              placeholder={detail.name}
              {...register(detail.name, {
                required: "This field is required",
                pattern: inputType === "email" && {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              style={
                isSubmitted
                  ? {
                      background: "rgb(119, 119, 119)",
                      color: "white",
                      fontWeight: 700,
                    }
                  : { backgroundColor: "white", color: "black" }
              }
              disabled={isSubmitted}
            />
          )}
          <button
            type="submit"
            disabled={isSubmitted}
            style={isSubmitted ? { background: "gray" } : {}}
          >
            <img src={sendIcon} />
          </button>
          {errors[detail.name] && <p>{errors[detail.name].message}</p>}
        </form>
      </div>
    );
  };

  return (
    <div
      className={styles.chatContainer}
      style={
        getSharedLinkUserDetails.data?.data?.sharedLinkDetails
          ? {
              backgroundColor:
                getSharedLinkUserDetails.data?.data?.sharedLinkDetails.theme,
            }
          : { backgroundColor: "#FFFFFF" }
      }
    >
      <div className={styles.chatWrapper}>
        {formDetails
          .slice(0, currentIndex)
          .map((detail) =>
            detail.inputType === "Bubble"
              ? renderBubble(detail)
              : renderInput(detail)
          )}
        {currentIndex < formDetails.length && (
          <>
            {formDetails[currentIndex].inputType === "Bubble" &&
              renderBubble(formDetails[currentIndex])}
            {waitingForInput &&
              formDetails[currentIndex].inputType === "Input" &&
              renderInput(formDetails[currentIndex])}
          </>
        )}
      </div>
    </div>
  );
};

export default SharedFormPage;
