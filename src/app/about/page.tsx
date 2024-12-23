"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book, Briefcase, GraduationCap } from "lucide-react";
import styles from "~/styles/About.module.css";

const HOME_BACKGROUND_URL = "/HomeBackground.mp4";
const PFP_URL = "/pfp.jpg";

export default function About() {
  const router = useRouter();

  const credentials = [
    {
      icon: <GraduationCap size={32} />,
      title: "Education",
      items: [
        "Bachelor's of Science in Computer Science - Johns Hopkins University",
      ],
    },
    {
      icon: <Briefcase size={32} />,
      title: "Experience",
      items: ["5 years as Software Engineer/Developer", "2 years as IT Manager"],
    },
    {
      icon: <Book size={32} />,
      title: "Specializations",
      items: [
        "Full Stack Development",
        "Frontend and Backend Framework",
        "Machine Learning/AI/Deep Learning",
      ],
    },
  ];

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/tlin2004/", "_blank");
  };

  return (
    <div className={styles.videoBackground}>
      {/* <Navbar /> */}

      {/* Background Video */}
      <div className={styles.videoContainer}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
        >
          <source src={HOME_BACKGROUND_URL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Main About Content */}
      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <div className={styles.aboutHero}>
          <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
              <Image src={PFP_URL} alt="Timothy Lin" width={200} height={200} />
            </div>
            <h1>Timothy Lin</h1>
            <p className={styles.title}>Founder & CEO</p>
          </div>
        </div>

        {/* Personal Story Section */}
        <div className={styles.aboutContainer}>
          <section className={styles.storySection}>
            <h2>About Me</h2>
            <p>
              I am a junior studying Computer Science, Applied Math and
              Statistics, and Finance at Johns Hopkins University. I have a
              passion for developing complex algorithms, machine learning
              projects, and quantitative modeling.
            </p>
            <p>
              University Application has long been a tough process. I have been
              through it, and I understand the stress and anxiety that come with
              it. That's why I developed NORA—to help students go through the
              process with ease.
            </p>
          </section>

          {/* Credentials Grid */}
          <section className={styles.credentialsSection}>
            <div className={styles.credentialsGrid}>
              {credentials.map((credential, index) => (
                <div key={index} className={styles.credentialCard}>
                  <div className={styles.credentialIcon}>{credential.icon}</div>
                  <h3>{credential.title}</h3>
                  <ul>
                    {credential.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.contactSection}>
            <h2>Let's Connect</h2>
            <p>
              I'm always excited to meet new students and progress together. If
              you have any questions or just want to chat, feel free to reach
              out on LinkedIn.
            </p>
            <button className={styles.ctaButton} onClick={handleLinkedInClick}>
              Connect on LinkedIn
            </button>
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.aboutFooter}>
          <p>© 2024 The Most Promising Future. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
