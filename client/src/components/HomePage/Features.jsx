import {
  calculator_icon,
  domain_icon,
  folder_icon,
  hidden_icon,
  link_icon,
  team_1,
  team_2,
  team_3,
  team_4,
  team_5,
  team_6,
  team_7,
  team_8,
  team_icon,
} from "../../data/fileImports";
import styles from "./Features.module.css";

function Features() {
  const data = [
    {
      imgUrl: hidden_icon,
      header: "Hidden fields",
      para: "Include data in your form URL to segment your user and use its data directly in your form",
    },
    {
      imgUrl: team_icon,
      header: "Team collaboration",
      para: "Invite your teammates to work on your typebots with you",
    },
    {
      imgUrl: link_icon,
      header: "Hidden fields",
      para: "Reuse your typebots in different parent bots",
    },
    {
      imgUrl: calculator_icon,
      header: "Hidden fields",
      para: "Customize everything with your own Javascript & CSS code",
    },
    {
      imgUrl: domain_icon,
      header: "Hidden fields",
      para: "Connect your typebot to the custom URL of your choice",
    },
    {
      imgUrl: folder_icon,
      header: "Hidden fields",
      para: "Organize your typebots in specific folders to keep it clean and work with multiple clients",
    },
  ];
  const teams = [
    team_1,
    team_2,
    team_3,
    team_4,
    team_5,
    team_6,
    team_7,
    team_8,
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>And many more features</h1>
        <p>Typebot makes form building easy and comes with powerful features</p>
      </div>
      <div className={styles.cards}>
        {data.map((feature, index) => (
          <div key={index} className={styles.container}>
            <div className={styles.middleIcon}>
              <img src={feature.imgUrl} />
            </div>
            <div className={styles.feature}>
              <h2>{feature.header}</h2>
              <span>{feature.para}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.loved_teams}>
        <h1>Loved by teams and creators from all around the world</h1>
        <div className={styles.gallery}>
          {teams.map((team, index) => (
            <div key={index}>
              <img src={team} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
