import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  button_input_icon,
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
  delete_icon, // Import your delete icon here
} from "../data/fileImports";
import NavWorkSpaceTool from "../components/Workspace/NavWorkSpaceTool";
import styles from "./WorkspaceTool.module.css";

function WorkspaceTool() {
  const { control, handleSubmit, setValue } = useForm();
  const [mainItems, setMainItems] = useState([]);
  const [counts, setCounts] = useState({ Bubbles: {}, Inputs: {} });
  const [errors, setErrors] = useState({}); // State to track errors

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
        showValue: "", // Default showValue to empty
      },
    ]);
  };

  const handleFileChange = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*"; // Accept images and videos
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result;
          setMainItems((prev) =>
            prev.map((mItem, mIndex) =>
              mIndex === index
                ? { ...mItem, showValue: base64String } // Show base64 string
                : mItem
            )
          );
          setValue(`bubbles[${index}].value`, base64String); // Save the base64 string in the form data
        };
      }
    };
    input.click(); // Trigger the click to open file dialog
  };

  const handleDelete = (index) => {
    setMainItems((prev) => prev.filter((_, mIndex) => mIndex !== index));
  };

  const handleSave = () => {
    const newErrors = {};
    mainItems.forEach((item, index) => {
      if (item.inputType === "Bubble" && item.showValue === "") {
        newErrors[index] = "This field is required"; // Set error message
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update error state
      return; // Prevent saving if there are errors
    } else {
      setErrors({}); // Clear errors if no issues
    }

    const formattedData = mainItems.map((item) => ({
      inputType: item.inputType,
      type: item.type,
      name: item.name,
      showValue: item.showValue || "", // Preserve showValue
    }));

    console.log(formattedData); // Log the formatted data
  };

  return (
    <>
      <NavWorkSpaceTool onSave={handleSubmit(handleSave)} />
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
              <div
                className={styles.options}
                onClick={() => addInput("buttons")}
              >
                <img src={button_input_icon} alt="Button Input" />
                <p>Buttons</p>
              </div>
            </div>
          </div>
        </aside>
        <div className={styles.mainSpace}>
          {mainItems.map((item, index) => (
            <div key={index} className={styles.itemContainer}>
              <span
                className={styles.deleteIcon}
                onClick={() => handleDelete(index)}
              >
                <img src={delete_icon} alt="Delete" />
              </span>
              {item.inputType === "Bubble" && item.type === "text" && (
                <div>
                  <label>{item.name}</label>
                  <Controller
                    name={`bubbles[${index}].value`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        style={{
                          borderColor: errors[index] ? "red" : "initial",
                        }} // Add red border if there's an error
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
                    <p style={{ color: "red" }}>{errors[index]}</p> // Display error message
                  )}
                </div>
              )}
              {item.inputType === "Bubble" &&
                ["image", "video", "gif"].includes(item.type) && (
                  <div>
                    <p>
                      {item.name}:{" "}
                      {item.showValue ? "Link added" : "Click to add a link"}
                    </p>
                    <button onClick={() => handleFileChange(index)}>
                      {item.showValue
                        ? "Change Link"
                        : "Click here to add links"}
                    </button>
                    {errors[index] && (
                      <p style={{ color: "red" }}>{errors[index]}</p> // Display error message
                    )}
                  </div>
                )}

              {item.inputType === "Input" && (
                <div>
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
                    <p>{item.showValue}</p> // Just show the label and keep showValue empty
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
