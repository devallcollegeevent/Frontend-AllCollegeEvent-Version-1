"use client";

import { useState } from "react";
import styles from "./YourNetwork.module.css";

export default function FollowersPage() {
  const [tab, setTab] = useState("followers");

  const followers = [
    { id: 1, name: "Nandhini Jaganathan", img: "/images/user.png" },
    { id: 2, name: "Sharmila Vijayan", img: "/images/user.png" },
    { id: 3, name: "GowshiPriya", img: "/images/user.png" },
    { id: 4, name: "GowshiPriya", img: "/images/user.png" },
    { id: 5, name: "SasiPrabha", img: "/images/user.png" },
    { id: 6, name: "Nandhini Subharamani", img: "/images/user.png" },
  ];

  const following = [
    { id: 1, name: "Nandhini Jaganathan", img: "/images/user.png" },
    { id: 2, name: "GowshiPriya", img: "/images/user.png" },
    { id: 3, name: "Sharmila Vijayan", img: "/images/user.png" },
    { id: 4, name: "GowshiPriya", img: "/images/user.png" },
    { id: 5, name: "SasiPrabha", img: "/images/user.png" },
    { id: 6, name: "Sharmila Vijayan", img: "/images/user.png" },
  ];

  const list = tab === "followers" ? followers : following;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Your Network</h2>

      {/* -------- TABS -------- */}
      <div className={styles.tabs}>
        <span
          className={`${styles.tab} ${
            tab === "followers" ? styles.activeTab : ""
          }`}
          onClick={() => setTab("followers")}
        >
          357 Followers
        </span>

        <span
          className={`${styles.tab} ${
            tab === "following" ? styles.activeTab : ""
          }`}
          onClick={() => setTab("following")}
        >
          357 Following
        </span>
      </div>

      {/* -------- LIST -------- */}
      <div className={styles.box}>
        {list.map((user) => (
          <div key={user.id} className={styles.row}>
            <div className={styles.userInfo}>
              <img src={user.img} alt="" className={styles.avatar} />
              <span className={styles.name}>{user.name}</span>
            </div>

            {tab === "following" && (
              <button className={styles.unfollowBtn}>Unfollow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
