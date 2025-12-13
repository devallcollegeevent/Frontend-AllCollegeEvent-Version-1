"use client";

import styles from "./RatingsAndReviews.module.css";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Nandhini Jaganathan",
      image: "/images/user.png",
      stars: 5,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do dolor ili eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Nandhini Jaganathan",
      image: "/images/user.png",
      stars: 5,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do dolor ili eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Nandhini Jaganathan",
      image: "/images/user.png",
      stars: 5,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do dolor ili eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Ratings and Reviews</h2>

      <div className={styles.box}>
        {reviews.map((r) => (
          <div key={r.id} className={styles.row}>
            {/* LEFT */}
            <div className={styles.left}>
              <img src={r.image} alt="" className={styles.avatar} />
              <span className={styles.name}>{r.name}</span>
            </div>

            {/* RIGHT */}
            <div className={styles.right}>
              <div className={styles.stars}>{"⭐".repeat(r.stars)}</div>
              <p className={styles.text}>{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
