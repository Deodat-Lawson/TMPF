"use client"; // If you are using Next.js App Router or similar

import React from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Target,
  School,
  UserCog,
  ArrowRight,
} from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplication.module.css";

const HomePage = () => {
  const router = useRouter();
  const username = "User"; // Replace with actual user data

  // List of feature cards
  const features = [
    {
      title: "AI Q&A",
      description:
        "Get instant answers to your university application questions from our AI assistant.",
      icon: <Brain size={32} />,
      path: "/ai-qa",
      color: "#2563eb",
    },
    {
      title: "Skill Assessment",
      description: "Discover your academic strengths and areas for improvement.",
      icon: <Target size={32} />,
      path: "/skills",
      color: "#7c3aed",
    },
    {
      title: "University Matching",
      description:
        "Find universities that match your profile and calculate your admission chances.",
      icon: <School size={32} />,
      path: "/university-matching",
      color: "#0891b2",
    },
    {
      title: "Profile Settings",
      description: "Update your personal information and preferences.",
      icon: <UserCog size={32} />,
      path: "/profile",
      color: "#059669",
    },
  ];

  return (
    <div className={styles.backgroundWrapper}>
      {/* Rotating Shapes */}
      <div className={styles.shape + " " + styles.shape1} />
      <div className={styles.shape + " " + styles.shape2} />
      <div className={styles.shape + " " + styles.shape3} />
      <div className={styles.shape + " " + styles.shape4} />
      <div className={styles.shape + " " + styles.shape5} />

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome, {username}</h1>
          <p className={styles.welcomeDescription}>
            Let's continue your journey to academic success
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => router.push(feature.path)}
              className={styles.featureButton}
            >
              <div
                className={styles.featureIcon}
                style={{
                  backgroundColor: `${feature.color}1A`, // #RRGGBBAA for a translucent background
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>

              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>

              <div
                className={styles.exploreLink}
                style={{ color: feature.color }}
              >
                Explore <ArrowRight size={16} className="ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
