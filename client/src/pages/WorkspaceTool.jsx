/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import flag from "/assets/Workspace/flag.svg";
import {
  date_input_icon,
  email_input_icon,
  gif_icon,
  image_icon,
  number_input_icon,
  phone_input_icon,
  rating_input_icon,
  text_icon,
  text_input_icon,
  video_icon,
  delete_icon,
} from "../data/fileImports";
import NavWorkSpaceTool from "../components/Workspace/NavWorkSpaceTool";
import styles from "./WorkspaceTool.module.css";
import useAuthentication from "../configuration/useAuthentication";

function WorkspaceTool() {
  const { getFormDetails } = useAuthentication();
  const { updateForm } = useAuthentication();
  const { control, handleSubmit, setValue } = useForm();
  const [mainItems, setMainItems] = useState([]);
  const [counts, setCounts] = useState({ Bubbles: {}, Inputs: {} });
  const [errors, setErrors] = useState({}); // State to track errors
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (getFormDetails.data) {
      setMainItems(getFormDetails.data?.data?.formDetails);
      setFormName(getFormDetails.data?.data?.formName);
    }
  }, [getFormDetails.data]);

  const incrementCount = (type, category) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [category]: {
        ...prevCounts[category],
        [type]: (prevCounts[category][type] || 0) + 1,
      },
    }));
    return counts[category][type] + 1 || 1;
  };

  const addBubble = (type) => {
    const count = incrementCount(type, "Bubbles");
    setMainItems((prev) => [
      ...prev,
      {
        inputType: "Bubble",
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
        showValue: "", // Default showValue to empty
      },
    ]);
  };

  const addInput = (type) => {
    const count = incrementCount(type, "Inputs");
    setMainItems((prev) => [
      ...prev,
      {
        inputType: "Input",
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Input ${count}`,
        showValue: "",
      },
    ]);
  };

  const handleFileChange = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result;
          setMainItems((prev) =>
            prev.map((mItem, mIndex) =>
              mIndex === index ? { ...mItem, showValue: base64String } : mItem
            )
          );
          setValue(`bubbles[${index}].value`, base64String);
        };
      }
    };
    input.click();
  };

  const handleDelete = (index) => {
    setMainItems((prev) => prev.filter((_, mIndex) => mIndex !== index));
  };

  const handleSave = () => {
    const newErrors = {};
    mainItems.forEach((item, index) => {
      if (item.inputType === "Bubble" && item.showValue === "") {
        newErrors[index] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    const formDetails = mainItems.map((item) => ({
      inputType: item.inputType,
      type: item.type,
      name: item.name,
      showValue: item.showValue || "",
    }));
    updateForm.mutate({ formName, formDetails });
  };

  const getHintMessage = (type) => {
    switch (type) {
      case "text":
        return "Hint: User will input text in this form.";
      case "email":
        return "Hint: User will input an email in this form.";
      case "number":
        return "Hint: User will input a number in this form.";
      case "phone":
        return "Hint: User will input a phone number in this form.";
      case "date":
        return "Hint: User will input a date in this form.";
      case "rating":
        return "Hint: User will give a rating in this form.";
      case "buttons":
        return "Hint: User will click buttons in this form.";
      default:
        return "Hint: User will input information in this form.";
    }
  };

  return (
    <>
      <NavWorkSpaceTool
        onSave={handleSubmit(handleSave)}
        setFormName={setFormName}
        formName={formName}
      />
      <div className={styles.wrapper}>
        <aside className={styles.asideContainer}>
          <div className={`flex flex-col`}>
            <h1 className={styles.header}>Bubbles</h1>
            <div className={styles.cards}>
              <div className={styles.options} onClick={() => addBubble("text")}>
                <img src={text_icon} alt="Text" />
                <p>Text</p>
              </div>
              <div
                className={styles.options}
                onClick={() => addBubble("image")}
              >
                <img src={image_icon} alt="Image" />
                <p>Image</p>
              </div>
              <div
                className={styles.options}
                onClick={() => addBubble("video")}
              >
                <img src={video_icon} alt="Video" />
                <p>Video</p>
              </div>
              <div className={styles.options} onClick={() => addBubble("gif")}>
                <img src={gif_icon} alt="GIF" />
                <p>GIF</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className={styles.header}>Inputs</h1>
            <div className={styles.cards}>
              <div className={styles.options} onClick={() => addInput("text")}>
                <img src={text_input_icon} alt="Text Input" />
                <p>Text</p>
              </div>
              <div
                className={styles.options}
                onClick={() => addInput("number")}
              >
                <img src={number_input_icon} alt="Number Input" />
                <p>Number</p>
              </div>
              <div className={styles.options} onClick={() => addInput("email")}>
                <img src={email_input_icon} alt="Email Input" />
                <p>Email</p>
              </div>
              <div className={styles.options} onClick={() => addInput("phone")}>
                <img src={phone_input_icon} alt="Phone Input" />
                <p>Phone</p>
              </div>
              <div className={styles.options} onClick={() => addInput("date")}>
                <img src={date_input_icon} alt="Date Input" />
                <p>Date</p>
              </div>
              <div
                className={styles.options}
                onClick={() => addInput("rating")}
              >
                <img src={rating_input_icon} alt="Rating Input" />
                <p>Rating</p>
              </div>
            </div>
          </div>
        </aside>
        <div className={styles.mainSpace}>
          <div className={styles.startDiv}>
            <img src={flag} />
            <p>Start</p>
          </div>
          {mainItems.map((item, index) => (
            <div key={index} className={styles.itemContainer}>
              <span
                className={styles.deleteIcon}
                onClick={() => handleDelete(index)}
              >
                <img src={delete_icon} alt="Delete" />
              </span>
              {item.inputType === "Bubble" && item.type === "text" && (
                <div className={styles.inputs}>
                  <label>{item.name}</label>
                  <Controller
                    name={`bubbles[${index}].value`}
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Add text here"
                        type="text"
                        defaultValue={item.showValue}
                        {...field}
                        style={{
                          border: errors[index]
                            ? "1px solid rgba(245, 80, 80, 1)"
                            : "initial", // Apply red border if there's an error
                        }}
                        onChange={(e) => {
                          setMainItems((prev) =>
                            prev.map((mItem, mIndex) =>
                              mIndex === index
                                ? { ...mItem, showValue: e.target.value }
                                : mItem
                            )
                          );
                          field.onChange(e);

                          // Clear error if input is filled
                          if (e.target.value) {
                            setErrors((prevErrors) => {
                              const newErrors = { ...prevErrors };
                              delete newErrors[index]; // Remove error for this index
                              return newErrors; // Return updated errors
                            });
                          }
                        }}
                      />
                    )}
                  />
                  {errors[index] && (
                    <span style={{ color: "rgba(245, 80, 80, 1)" }}>
                      {errors[index]}
                    </span> // Display error message
                  )}
                </div>
              )}
              {item.inputType === "Bubble" &&
                ["image", "video", "gif"].includes(item.type) && (
                  <div className={styles.inputs}>
                    <label>{item.name}</label>
                    <p
                      onClick={() => handleFileChange(index)}
                      style={{
                        border: errors[index]
                          ? "1px solid rgba(245, 80, 80, 1)"
                          : "initial", // Apply red border if there's an error
                      }}
                      className={styles.plabel}
                    >
                      {item.showValue ? "Link added" : "Click to add a link"}
                    </p>
                    {errors[index] && (
                      <span style={{ color: "rgba(245, 80, 80, 1)" }}>
                        {errors[index]}
                      </span> // Display error message
                    )}
                  </div>
                )}

              {item.inputType === "Input" && (
                <div className={styles.users_input}>
                  <label>{item.name}</label>
                  {[
                    "text",
                    "email",
                    "date",
                    "number",
                    "phone",
                    "rating",
                    "buttons",
                  ].includes(item.type) ? (
                    <p>{getHintMessage(item.type)}</p> // Display dynamic hint message
                  ) : (
                    <Controller
                      name={`inputs[${index}].value`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            // You can add more logic here if needed
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WorkspaceTool;
