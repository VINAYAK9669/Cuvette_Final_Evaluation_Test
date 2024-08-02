/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";

const SharedFormPage = () => {
  const { getSharedLinkUserDetails, addNewuserToSharedlink } =
    useAuthentication();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [randomId, setRandomId] = useState("");
  const [sharedLink, setSharedLink] = useState("");

  const { addUserInputsToSharedLink } = useAuthentication();

  // Extract form details from shared link data
  const formDetails =
    getSharedLinkUserDetails.data?.data?.sharedLinkDetails.formDetails || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  console.log(randomId);

  useEffect(() => {
    if (randomId)
      addNewuserToSharedlink.mutate({
        sharedLink: window.location.href,
        RandomId: randomId,
      });
  }, [randomId]);

  const handleUserInput = async (data) => {
    const currentDetail = formDetails[currentIndex];

    addUserInputsToSharedLink.mutate({
      sharedLink,
      randomId,
      formInput: {
        name: currentDetail.name,
        userResponse: data[currentDetail.name],
        completionStatus: true,
      },
    });

    console.log(randomId);

    // Example API call
    // await sendDataToBackend(inputData); // Define sendDataToBackend to handle the API request

    setUserResponses((prev) => ({
      ...prev,
      [currentDetail.name]: data[currentDetail.name],
    }));
    console.log(data);
    setWaitingForInput(false);
    setCurrentIndex(currentIndex + 1); // Move to the next item
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
      <div key={detail._id} style={{ textAlign: "left", marginBottom: "10px" }}>
        <div
          style={{
            backgroundColor: "#e0e0e0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {content}
        </div>
      </div>
    );
  };

  const renderInput = (detail) => {
    return (
      <div
        key={detail._id}
        style={{ textAlign: "right", marginBottom: "10px" }}
      >
        <form onSubmit={handleSubmit(handleUserInput)}>
          <input
            type={detail.type}
            placeholder={detail.name}
            {...register(detail.name, {
              required: "This field is required",
              pattern: detail.type === "email" && {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button type="submit">Submit</button>
          {errors[detail.name] && <p>{errors[detail.name].message}</p>}
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Chatbot</h1>
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
      {currentIndex >= formDetails.length && (
        <p>Thank you for your responses!</p>
      )}
      <pre>{JSON.stringify(userResponses, null, 2)}</pre>
    </div>
  );
};

export default SharedFormPage;
