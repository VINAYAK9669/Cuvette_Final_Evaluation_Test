import {
  bmw_icon,
  boc_icon,
  calendar_icon,
  drive_icon,
  embroy_icon,
  gmail_icon,
  link_icon,
  monkey_icon,
  notion_icon,
  salesforce_icon,
  sheet_icon,
  shopify_icon,
  slack_icon,
  wordpress_icon,
  zapier_icon,
} from "../../data/fileImports";
import styles from "./Client.module.css";
function Client() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <img src={gmail_icon} />
        </div>
        <div>
          <img src={monkey_icon} />
        </div>
        <div>
          <img src={notion_icon} />
        </div>
        <div>
          <img src={wordpress_icon} />
        </div>
        <div>
          <img src={bmw_icon} />
        </div>
        <div>
          <img src={calendar_icon} />
        </div>
        <div>
          <img src={link_icon} />
        </div>
        <div>
          <img src={drive_icon} />
        </div>
        <div>
          <img src={slack_icon} />
        </div>
        <div>
          <img src={shopify_icon} />
        </div>
        <div>
          <img src={boc_icon} />
        </div>
        <div>
          <img src={sheet_icon} />
        </div>
        <div>
          <img src={zapier_icon} />
        </div>
        <div>
          <img src={embroy_icon} />
        </div>
        <div>
          <img src={salesforce_icon} />
        </div>
      </div>
      <div className={styles.section_bottom}>
        <h1>Integrate with any platform</h1>
        <p>
          Typebot offers several native integrations blocks as well as
          instructions on how to embed typebot on particular platforms
        </p>
      </div>
    </>
  );
}

export default Client;
