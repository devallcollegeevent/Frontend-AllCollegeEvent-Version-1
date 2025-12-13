"use client";

import React from "react";
import styles from "./ProfileHeader.module.css";
import { useRouter } from "next/navigation";

export default function ProfileHeader({
  coverColor = "#3f3f3f",
  role = "Organizer",
  profileImage,
  name = "Prabavathi M",
  followers = 0,
  following = 0,
  rank = 0,
  reviews = 0,
}) {
  const router = useRouter();

  // ===============================
  // NAVIGATION HANDLERS
  // ===============================
  const goFollowers = () => {
    router.push("/organizer/dashboard/my-profile/followers");
  };

  const goFollowing = () => {
    router.push("/organizer/dashboard/my-profile/following");
  };

  const goReviews = () => {
    router.push("/organizer/dashboard/my-profile/reviews");
  };

  return (
    <div className={styles.header_wrapper}>
      {/* TOP COVER */}
      <div className={styles.cover} style={{ background: coverColor }}>
        <div className={styles.role_badge}>
          <span className={styles.role_dot}></span>
          {role}
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div style={{ paddingLeft: "10px" }}>
          <img
            src={profileImage || "/images/creatorprofile.png"}
            alt="profile"
            className={styles.profile_img}
          />

          <div
            className={styles.reviews}
            onClick={goReviews}
            style={{ cursor: "pointer" }}
          >
            <div>⭐⭐⭐⭐⭐</div>
            <span className={styles.review_text}>
              {reviews} Reviews
            </span>
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>
            {name}{" "}
            <span className={styles.role_small}>
              ({role})
            </span>
          </h2>

          <div className={styles.follow_info}>
            <span
              className={styles.clickable}
              onClick={goFollowers}
            >
              {followers} Followers
            </span>

            <span
              className={styles.clickable}
              onClick={goFollowing}
            >
              {following} Following
            </span>
          </div>

          <div className={styles.rank}>#{rank} Rank</div>
        </div>
      </div>
    </div>
  );
}
