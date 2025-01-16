"use client";

import React from "react";
import { useRouter } from "next/navigation";
// If you're on Next.js < 13, use: import { useRouter } from "next/router";
import { Construction, ArrowLeft, Clock } from "lucide-react";
// For styling, either import a global CSS or a CSS module
import styles from "~/styles/FeatureUnavailable.module.css";

const FeatureUnavailable = () => {
  const router = useRouter();

  return (
    <div className={styles["feature-unavailable"]}>
      <div className={styles["animated-bg"]}>
        {[...Array(5).keys()].map(( i) => (
          <div
            key={i}
            className={styles["bg-circle"]}
            style={{
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className={styles["content-container"]}>
        <div className={styles["icon-container"]}>
          <Construction className={styles["construction-icon"]} size={64} />
        </div>

        <h1>Feature Coming Soon</h1>

        <div className={styles["message-container"]}>
          <p className={styles["main-message"]}>
            We&apos;re working hard to bring this feature to life!
          </p>
          <div className={styles["status-badge"]}>
            <Clock size={20} />
            <span>Under Development</span>
          </div>
        </div>

        <div className={styles["info-text"]}>
          <p>
            This feature is currently under development and will be available in
            a future update.
          </p>
          <p>Thank you for your patience!</p>
        </div>

        <button className={styles["back-button"]} onClick={() => router.back()}>
          <ArrowLeft size={20} />
          Return to Previous Page
        </button>
      </div>
    </div>
  );
};

export default FeatureUnavailable;
