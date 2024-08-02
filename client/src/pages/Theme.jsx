/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  dark_theme,
  Dark_theme,
  hello,
  hi,
  icon,
  light_theme,
  Light_theme,
  Tail_blue,
  tail_blue_theme,
} from "../data/fileImports";
import styles from "./Theme.module.css";
import NavWorkSpaceTool from "../components/Workspace/NavWorkSpaceTool";
import useAuthentication from "../configuration/useAuthentication";

function Theme() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const { addThemeToform } = useAuthentication();

  // Function to log the selected theme color
  const logSelectedTheme = (color) => {
    console.log("Selected Theme Color:", color);
  };
  function handleSetTheme() {
    addThemeToform.mutate({ theme: backgroundColor });
  }

  const handleImageClick = (image, color) => {
    setSelectedImage(image);
    setBackgroundColor(color);
    logSelectedTheme(color); // Log the selected color
  };

  const getImageStyle = (image) => {
    return {
      border: selectedImage === image ? "4px solid blue" : "none",
      borderRadius: "8px", // Ensure there is no border radius
    };
  };

  return (
    <>
      <NavWorkSpaceTool handleSetTheme={handleSetTheme} />
      <div className={styles.wrapper}>
        <aside className={styles.asideContainer}>
          <div className={styles.cards}>
            <div className={`flex flex-col`}>
              <img
                src={dark_theme}
                alt="Dark Theme Small"
                onClick={() => handleImageClick(Dark_theme, "#171A23")}
                style={getImageStyle(Dark_theme)}
              />
            </div>
            <div>
              <img
                src={light_theme}
                alt="Light Theme Small"
                onClick={() => handleImageClick(Light_theme, "#FFFFFF")}
                style={getImageStyle(Light_theme)}
              />
            </div>
            <div>
              <img
                src={tail_blue_theme}
                alt="Tail Blue Small"
                onClick={() =>
                  handleImageClick(Tail_blue, "rgba(80, 140, 155, 1)")
                }
                style={getImageStyle(Tail_blue)}
              />
            </div>
          </div>
        </aside>
        <div className={styles.mainSpace} style={{ backgroundColor }}>
          <div>
            <img src={icon} alt="Icon" />
            <img src={hello} alt="Hello" />
          </div>
          <div>
            <img src={hi} alt="Hi" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Theme;
