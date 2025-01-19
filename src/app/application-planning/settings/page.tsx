"use client";

import React, { useState } from "react";
import {
  User,
  Book,
  GraduationCap,
  Award,
  Map,
  Plus,
  Minus,
  Save,
} from "lucide-react";
import styles from "~/styles/ApplicationPlanning/Settings.module.css";

interface ExtracurricularActivity {
  activity: string;
  role: string;
  yearsInvolved: string;
  description: string;
}

// Reusable sub-component for the section header
const SectionHeader = ({
                         icon,
                         title,
                       }: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className={styles.sectionHeader}>
    <div className={styles.iconWrapper}>{icon}</div>
    <h2 className={styles.sectionTitle}>{title}</h2>
  </div>
);

const EditProfile = () => {
  const [activities, setActivities] = useState<ExtracurricularActivity[]>([
    {
      activity: "",
      role: "",
      yearsInvolved: "",
      description: "",
    },
  ]);

  const addActivity = () => {
    setActivities([
      ...activities,
      {
        activity: "",
        role: "",
        yearsInvolved: "",
        description: "",
      },
    ]);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          {/* Personal Information */}
          <section className={styles.section}>
            <SectionHeader icon={<User size={24} />} title="Personal Information" />

            <div className={styles.twoColumnGrid}>
              <input type="text" placeholder="First Name" className={styles.inputBase} />
              <input type="text" placeholder="Last Name" className={styles.inputBase} />
              <input type="email" placeholder="Email" className={styles.inputBase} />
              <input type="tel" placeholder="Phone Number" className={styles.inputBase} />
              <input type="date" placeholder="Date of Birth" className={styles.inputBase} />
              <input type="text" placeholder="Citizenship" className={styles.inputBase} />
            </div>
          </section>

          {/* Academic Information */}
          <section className={styles.section}>
            <SectionHeader icon={<Book size={24} />} title="Academic Information" />

            <div className={styles.twoColumnGrid}>
              <input type="text" placeholder="Current School" className={styles.inputBase} />
              <input type="text" placeholder="Graduation Year" className={styles.inputBase} />
              <input
                type="number"
                step="0.01"
                placeholder="GPA (Unweighted)"
                className={styles.inputBase}
              />
              <input
                type="number"
                step="0.01"
                placeholder="GPA (Weighted)"
                className={styles.inputBase}
              />
              <input type="text" placeholder="Class Rank" className={styles.inputBase} />
              <input type="number" placeholder="SAT Score" className={styles.inputBase} />
              <input type="number" placeholder="ACT Score" className={styles.inputBase} />
            </div>

            <div className={styles.mt20}>
              <textarea
                placeholder="AP Tests (Format: Subject - Score, e.g., Calculus BC - 5)"
                rows={3}
                className={styles.textareaBase}
              />
            </div>
            <div className={styles.mt20}>
              <textarea
                placeholder="IB Tests (Format: Subject - Score)"
                rows={3}
                className={styles.textareaBase}
              />
            </div>
          </section>

          {/* Academic Interests */}
          <section className={styles.section}>
            <SectionHeader
              icon={<GraduationCap size={24} />}
              title="Academic Interests"
            />

            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Intended Major"
                className={styles.inputBase}
              />
              <input
                type="text"
                placeholder="Academic Interests (comma-separated)"
                className={styles.inputBase}
              />
              <textarea
                placeholder="Career Goals"
                rows={4}
                className={styles.textareaBase}
              />
            </div>
          </section>

          {/* Extracurricular Activities */}
          <section className={styles.section}>
            <SectionHeader icon={<Award size={24} />} title="Extracurricular Activities" />

            {activities.map((activity, index) => (
              <div key={index} className={styles.activityCard}>
                <div className={styles.activityHeader}>
                  <h3 className={styles.activityTitle}>Activity {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className={styles.removeButton}
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Activity Name"
                    className={styles.inputBase}
                  />
                  <input
                    type="text"
                    placeholder="Role/Position"
                    className={styles.inputBase}
                  />
                  <input
                    type="text"
                    placeholder="Years Involved"
                    className={styles.inputBase}
                  />
                  <textarea
                    placeholder="Description of your involvement"
                    rows={3}
                    className={styles.textareaBase}
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={addActivity} className={styles.addActivityButton}>
              <Plus size={20} />
              Add Another Activity
            </button>
          </section>

          {/* University Preferences */}
          <section className={styles.section}>
            <SectionHeader icon={<Map size={24} />} title="University Preferences" />

            <div className="grid gap-5">
              <div>
                <label className="block mb-2 text-[#1a365d] font-medium">
                  Location Preference
                </label>
                <div className="flex gap-4">
                  {["Urban", "Suburban", "Rural"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="location" value={option} className="w-4 h-4" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[#1a365d] font-medium">
                  Campus Environment
                </label>
                <div className="flex gap-4">
                  {["Liberal Arts", "Research University", "Technical"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="campusType" value={option} className="w-4 h-4" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="block mb-2 text-[#1a365d] font-medium">
                    University Size Preference
                  </label>
                  <select className={styles.inputBase}>
                    <option value="">Select size preference</option>
                    <option value="small">Small (&lt; 5,000)</option>
                    <option value="medium">Medium (5,000 - 15,000)</option>
                    <option value="large">Large (&gt; 15,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-[#1a365d] font-medium">Annual Budget (USD)</label>
                  <input
                    type="number"
                    placeholder="Enter your budget"
                    className={styles.inputBase}
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="financialAid" className="w-4 h-4" />
                    Financial Aid Needed
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className={styles.section}>
            <SectionHeader icon={<Award size={24} />} title="Additional Information" />

            <div className="grid gap-6">
              <div>
                <label className="block mb-2 text-[#1a365d] font-medium">
                  Honors/Awards (comma-separated)
                </label>
                <textarea
                  placeholder="Enter your honors and awards"
                  rows={3}
                  className={styles.textareaBase}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#1a365d] font-medium">Personal Statement</label>
                <textarea
                  placeholder="Share your story"
                  rows={6}
                  className={styles.textareaBase}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#1a365d] font-medium">
                  Supplemental Essay
                </label>
                <textarea
                  placeholder="Additional essay or specific university prompt response"
                  rows={6}
                  className={styles.textareaBase}
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <button type="submit" className={styles.saveButton}>
            <Save size={20} />
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
