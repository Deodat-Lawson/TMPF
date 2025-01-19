"use client";

import React from "react";
import {
  BookOpen,
  Award,
  FileText,
  Mail,
  Users,
  Star,
  Heart,
  Trophy,
  Briefcase,
  User,
  Info,
} from "lucide-react";
import styles from "~/styles/ApplicationPlanning/SkillAssessment.module.css";

interface SkillCategory {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  strengths?: string[];
  improvements?: string[];
}

const SkillsAssessment = () => {
  const skills: SkillCategory[] = [
    {
      title: "Academic Performance",
      score: 8,
      icon: <BookOpen size={24} />,
      description: "Strong GPA with consistent improvement in challenging courses",
      strengths: ["4.0 GPA in senior year", "AP/IB courses"],
      improvements: ["Consider taking more STEM courses"],
    },
    {
      title: "Standardized Test Scores",
      score: 7,
      icon: <Award size={24} />,
      description: "Above average scores with room for improvement",
      strengths: ["Strong math section", "Good writing score"],
      improvements: ["Consider retaking for higher verbal score"],
    },
    {
      title: "Personal Statement",
      score: 9,
      icon: <FileText size={24} />,
      description: "Compelling narrative with clear goals and unique perspective",
      strengths: ["Strong writing style", "Personal insights"],
      improvements: ["Add more specific examples"],
    },
    {
      title: "Letters of Recommendation",
      score: 8,
      icon: <Mail size={24} />,
      description: "Strong endorsements from teachers and counselors",
      strengths: ["Multiple subject areas", "Detailed examples"],
      improvements: ["Consider getting one more academic reference"],
    },
    {
      title: "Extracurricular Activities",
      score: 6,
      icon: <Users size={24} />,
      description: "Good variety but could use more depth in key areas",
      strengths: ["Diverse activities", "Consistent participation"],
      improvements: ["Focus on leadership roles"],
    },
    {
      title: "Leadership and Initiative",
      score: 7,
      icon: <Star size={24} />,
      description: "Demonstrated leadership in select activities",
      strengths: ["Club president role", "Project management"],
      improvements: ["Seek more leadership opportunities"],
    },
    {
      title: "Community Service",
      score: 8,
      icon: <Heart size={24} />,
      description: "Strong commitment to community engagement",
      strengths: ["Regular volunteering", "Initiative in projects"],
      improvements: ["Document impact more clearly"],
    },
    {
      title: "Awards and Honors",
      score: 5,
      icon: <Trophy size={24} />,
      description: "Some recognition in specific areas",
      strengths: ["Academic honors", "Competition awards"],
      improvements: ["Participate in more competitions"],
    },
    {
      title: "Work Experience",
      score: 6,
      icon: <Briefcase size={24} />,
      description: "Valuable experience but limited duration",
      strengths: ["Leadership role", "Customer service skills"],
      improvements: ["Seek relevant internships"],
    },
    {
      title: "Personal Qualities",
      score: 9,
      icon: <User size={24} />,
      description: "Strong character and unique perspective",
      strengths: ["Cultural awareness", "Communication skills"],
      improvements: ["Document personal growth"],
    },
  ];

  // Helper to decide bar color based on score
  const getBarColor = (score: number) => {
    if (score >= 8) return "#22c55e"; // green
    if (score >= 6) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Skills Assessment</h1>
          <p className={styles.headerDesc}>
            Your strengths and areas for improvement in university applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>{skill.icon}</div>
                <div className="flex-1">
                  <h3 className={styles.skillTitle}>{skill.title}</h3>
                </div>
              </div>

              {/* Score Bar */}
              <div className={styles.progressBarContainer}>
                <div
                  style={{
                    width: `${skill.score * 10}%`,
                    backgroundColor: getBarColor(skill.score),
                    transition: "width 1s ease-out",
                    height: "100%", // ensures the fill is the same height as container
                  }}
                />
              </div>

              {/* Score and Description */}
              <div>
                <div className={styles.scoreRow}>
                  <span className={styles.scoreLabel}>Score</span>
                  <span className={styles.scoreValue}>{skill.score}/10</span>
                </div>
                <p className={styles.scoreDescription}>{skill.description}</p>
              </div>

              {/* Strengths and Improvements */}
              <div className={styles.siGrid}>
                <div>
                  <h4 className={styles.strengthTitle}>Strengths</h4>
                  <ul className={styles.ulList}>
                    {skill.strengths?.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={styles.improveTitle}>Areas for Improvement</h4>
                  <ul className={styles.ulList}>
                    {skill.improvements?.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Summary */}
        <div className={styles.overallSummary}>
          <h2 className={styles.overallSummaryTitle}>
            <Info size={24} />
            Overall Assessment
          </h2>
          <p className={styles.overallSummaryText}>
            Your profile shows strong academic performance and personal
            qualities. Focus on gaining more leadership experience and
            participating in competitions to strengthen your extracurricular
            portfolio. Consider seeking additional internship opportunities to
            gain practical experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsAssessment;
