/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import NavWorkSpaceTool from "../components/Workspace/NavWorkSpaceTool";
import useAuthentication from "../configuration/useAuthentication";
import styles from "./Analystics.module.css";

const BASE_URL = "https://cuvette-final-evaluation-test.onrender.com/";
function Analytics() {
  const { getFormDetails } = useAuthentication();
  const [sharedLinkDetails, setSharedLinkDetails] = useState(null);
  const sharedLink = getFormDetails.data?.data?.sharedLink;

  const fetchSharedLinkDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}response/get-shared-link-details/`,
        {
          params: { sharedLink },
        }
      );
      setSharedLinkDetails(response.data);
    } catch (error) {
      console.error("Error fetching shared link details:", error);
    }
  };

  useEffect(() => {
    if (sharedLink) {
      fetchSharedLinkDetails();
    }
  }, [sharedLink]);

  const calculateStats = () => {
    if (!sharedLinkDetails?.sharedLinkDetails)
      return { views: 0, starts: 0, completionRate: 0 };

    const formFillerData = sharedLinkDetails.sharedLinkDetails.formFillerData;
    const formDetails = sharedLinkDetails.sharedLinkDetails.formDetails;

    // Views: Count of total entries in formFillerData
    const views = formFillerData.length;

    // Starts: Count of formFillerData with non-empty formDetails
    const starts = formFillerData.filter(
      (filler) => filler.formDetails.length > 0
    ).length;

    // Total Inputs: Count inputs in formDetails where inputType is "Input"
    const totalInputs = formDetails.filter(
      (detail) => detail.inputType === "Input"
    ).length;

    // Calculate individual completion rates for each user in formFillerData
    let individualCompletionRates = [];

    formFillerData.forEach((filler) => {
      const userCompletedInputs = filler.formDetails.length; // Count of user's filled inputs

      // Only calculate completion rate if user's formDetails is not empty
      if (userCompletedInputs > 0) {
        const userCompletionRate =
          totalInputs > 0 ? (userCompletedInputs / totalInputs) * 100 : 0; // Calculate completion rate for the user
        individualCompletionRates.push(userCompletionRate); // Store the completion rate for this user
      }
    });

    // Calculate average completion rate
    const overallCompletionRate =
      individualCompletionRates.length > 0
        ? individualCompletionRates.reduce((acc, rate) => acc + rate, 0) /
          individualCompletionRates.length
        : 0; // Set to 0 if no valid completion rates

    return { views, starts, completionRate: overallCompletionRate };
  };
  const { views, starts, completionRate } = calculateStats();

  const renderTableHeader = () => {
    const headers = ["Sr.No", "Submitted Date"];
    if (sharedLinkDetails?.sharedLinkDetails?.formDetails) {
      sharedLinkDetails.sharedLinkDetails.formDetails.forEach((detail) => {
        if (detail.inputType === "Input") {
          headers.push(detail.name);
        }
      });
    }
    return headers.map((header, index) => (
      <th key={index} className={styles.tableHeader}>
        {header}
      </th>
    ));
  };

  const renderTableRows = () => {
    if (sharedLinkDetails?.sharedLinkDetails?.formFillerData) {
      let serialNumber = 1; // Initialize a separate counter for Sr. No
      return sharedLinkDetails.sharedLinkDetails.formFillerData.map(
        (filler) => {
          if (filler.formDetails.length > 0) {
            // Format the date
            const submittedDate = new Date(
              filler.formDetails[0]?.creationDate
            ).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return (
              <tr key={filler.RandomId}>
                <td>{serialNumber++}</td>{" "}
                {/* Increment counter for each displayed row */}
                <td>{submittedDate}</td>
                {sharedLinkDetails.sharedLinkDetails.formDetails.map(
                  (detail, i) => {
                    if (detail.inputType === "Input") {
                      return (
                        <td key={i}>
                          {filler.formDetails.find(
                            (fd) => fd.name === detail.name
                          )?.userResponse || ""}
                        </td>
                      );
                    }
                    return null;
                  }
                )}
              </tr>
            );
          }
          return null;
        }
      );
    }
    return null;
  };

  const hasFillerData =
    sharedLinkDetails?.sharedLinkDetails?.formFillerData?.length > 0;

  return (
    <div>
      <NavWorkSpaceTool />
      {hasFillerData ? (
        <>
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <h3>Views</h3>
              <p>{views}</p>
            </div>
            <div className={styles.statBox}>
              <h3>Starts</h3>
              <p>{starts}</p>
            </div>
            <div className={styles.statBox}>
              <h3>Completion Rate</h3>
              <p>{completionRate.toFixed(2)}%</p>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.scrollableTable}>
              <thead>
                <tr>{renderTableHeader()}</tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
}

export default Analytics;
