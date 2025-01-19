"use client";

import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  MapPin,
  Users,
  DollarSign,
  ChevronDown,
  Star,
} from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityMatching.module.css";

interface University {
  id: string;
  name: string;
  location: string;
  matchScore: number;
  image: string;
  description: string;
  matchingReason: string;
  studentBody: string;
  acceptanceRate: string;
  tuition: string;
  ranking: string;
  strengths: string[];
  programs: string[];
}

const UniversityMatching = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  // Sample data - replace with actual API data
  const topMatches: University[] = [
    {
      id: "1",
      name: "Stanford University",
      location: "Stanford, CA",
      matchScore: 95,
      image: "/api/placeholder/400/200",
      description:
        "Stanford University is a leading private research university located in the heart of Silicon Valley.",
      matchingReason:
        "Your strong STEM background and leadership in robotics competitions aligns perfectly with Stanford's engineering programs. Your entrepreneurial projects and research experience match their innovation-focused culture.",
      studentBody: "16,937 students",
      acceptanceRate: "4.3%",
      tuition: "$56,169",
      ranking: "#3 National Universities",
      strengths: ["Computer Science", "Engineering", "Business", "Research"],
      programs: ["BS Computer Science", "BS Engineering", "BA Economics"],
    },
    {
      id: "2",
      name: "MIT",
      location: "Cambridge, MA",
      matchScore: 92,
      image: "/api/placeholder/400/200",
      description:
        "The Massachusetts Institute of Technology is a world-renowned science and technology research university.",
      matchingReason:
        "Your exceptional mathematics achievements and physics research project strongly match MIT's rigorous academic environment. Your hackathon victories demonstrate the hands-on approach MIT values.",
      studentBody: "11,376 students",
      acceptanceRate: "7.3%",
      tuition: "$55,878",
      ranking: "#2 National Universities",
      strengths: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      programs: ["SB Computer Science", "SB Engineering", "SB Mathematics"],
    },
    // etc...
  ];

  // Helper function to decide color for matchBadge
  const getMatchColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // green
    if (score >= 80) return "#3b82f6"; // blue
    if (score >= 70) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const UniversityCard = ({
                            university,
                            isExpanded = false,
                          }: {
    university: University;
    isExpanded?: boolean;
  }) => (
    <div
      className={styles.card}
      onClick={() => setSelectedUniversity(isExpanded ? null : university)}
    >
      {/* Image */}
      <img
        src={university.image}
        alt={university.name}
        className={styles.cardImage}
      />

      {/* Card Body */}
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardName}>{university.name}</h2>
            <div className={styles.locationRow}>
              <MapPin size={16} />
              {university.location}
            </div>
          </div>

          <div
            className={styles.matchBadge}
            style={{ background: getMatchColor(university.matchScore) }}
          >
            {university.matchScore}% Match
          </div>
        </div>

        {isExpanded ? (
          <div className={styles.fadeIn}>
            {/* Reason Container */}
            <div className={styles.reasonContainer}>
              <h3 className={styles.reasonTitle}>
                <Star size={20} color="#2563eb" />
                Why This Matches You
              </h3>
              <p className={styles.reasonDesc}>{university.matchingReason}</p>
            </div>

            <div className={styles.quickFacts}>
              <div>
                <h4 className={styles.factsHeader}>Quick Facts</h4>
                <div className={styles.factsRow}>
                  <Users size={16} />
                  {university.studentBody}
                </div>
                <div className={styles.factsRow}>
                  <GraduationCap size={16} />
                  {university.acceptanceRate}
                </div>
                <div className={styles.factsRow}>
                  <DollarSign size={16} />
                  {university.tuition}/year
                </div>
              </div>

              <div>
                <h4 className={styles.factsHeader}>Top Programs</h4>
                <ul className={styles.topProgramsList}>
                  {university.programs.map((program, idx) => (
                    <li key={idx} className="text-gray-500 mb-1">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Strengths */}
            <div className={styles.strengthsWrapper}>
              {university.strengths.map((strength, index) => (
                <span key={index} className={styles.strengthChip}>
                  {strength}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.collapsedPrompt}>
            <ChevronDown size={16} />
            Click to see more details
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        {/* Header and Search */}
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Your University Matches</h1>
          <p className={styles.headerDesc}>Based on your profile and preferences</p>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <Search size={20} className={styles.searchIcon} />
          </div>
        </div>

        {/* University Grid */}
        <div className={styles.universityGrid}>
          {topMatches.map((university) => (
            <UniversityCard
              key={university.id}
              university={university}
              isExpanded={selectedUniversity?.id === university.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityMatching;
