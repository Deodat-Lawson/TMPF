"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// CSS Module
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";

// Shared types
import { FormData } from "./types";

// Step Components
import PersonalInformationStep from "./steps/PersonalInformationStep";
import AcademicInformationStep from "./steps/AcademicInformationStep";
import AcademicInterestsStep from "./steps/AcademicInterestsStep";
import ExtracurricularActivitiesStep from "./steps/ExtracurricularActivitiesStep";
import UniversityPreferencesStep from "./steps/UniversityPreferencesStep";
import AdditionalInformationStep from "./steps/AdditionalInformationStep";

const UniversityApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // The local form state
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    citizenship: "",

    // Academic Information
    currentSchool: "",
    graduationYear: "",
    gpa: "",
    weightedGpa: "",
    classRank: "",
    satScore: "",
    actScore: "",
    apTests: "",
    ibTests: "",

    // Academic Interests
    intendedMajor: "",
    academicInterests: [],
    careerGoals: "",

    // Extracurricular Activities
    extracurriculars: [
      {
        activity: "",
        role: "",
        yearsInvolved: "",
        description: "",
      },
    ],

    // University Preferences
    locationPreference: [],
    campusEnvironment: [],
    universitySize: "",
    budget: "",
    financialAid: false,

    // Additional Information
    honors: [],
    essays: {
      personalStatement: "",
      supplementalEssay: "",
    },
  });

  // Handle checkbox changes (locationPreference, campusEnvironment, etc.)
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "locationPreference" | "campusEnvironment"
  ) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const currentValues = prevData[fieldName];
      if (checked) {
        return { ...prevData, [fieldName]: [...currentValues, value] };
      } else {
        return {
          ...prevData,
          [fieldName]: currentValues.filter((v) => v !== value),
        };
      }
    });
  };

  // Toggle for financial aid checkbox
  const handleToggleFinancialAid = () => {
    setFormData((prevData) => ({
      ...prevData,
      financialAid: !prevData.financialAid,
    }));
  };

  // Final form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send `formData` to your backend
    console.log("Submitted form data:", formData);
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <AcademicInformationStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <AcademicInterestsStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <ExtracurricularActivitiesStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <UniversityPreferencesStep
            formData={formData}
            setFormData={setFormData}
            handleCheckboxChange={handleCheckboxChange}
            handleToggleFinancialAid={handleToggleFinancialAid}
          />
        );
      case 6:
        return (
          <AdditionalInformationStep
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBarHeader}>
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* Render the current step */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className={styles.navigationButtons}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((step) => step - 1)}
                className={styles.prevButton}
              >
                <ArrowLeft size={20} />
                Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((step) => step + 1)}
                className={styles.nextButton}
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button type="submit" className={styles.nextButton}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityApplicationForm;
