// steps/UniversityPreferencesStep.tsx

import React from "react";
import { MapPin } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface UniversityPreferencesStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "locationPreference" | "campusEnvironment"
  ) => void;
  handleToggleFinancialAid: () => void;
}

const UniversityPreferencesStep: React.FC<UniversityPreferencesStepProps> = ({
                                                                               formData,
                                                                               setFormData,
                                                                               handleCheckboxChange,
                                                                               handleToggleFinancialAid,
                                                                             }) => {
  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <MapPin size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>University Preferences</h2>
      </div>

      <div className="mb-5">
        <p className="mb-2 font-medium">Location Preference:</p>
        {["Urban", "Suburban", "Rural"].map((loc) => (
          <label key={loc} className="mr-4">
            <input
              type="checkbox"
              value={loc}
              checked={formData.locationPreference.includes(loc)}
              onChange={(e) => handleCheckboxChange(e, "locationPreference")}
            />
            <span className="ml-1">{loc}</span>
          </label>
        ))}
      </div>

      <div className="mb-5">
        <p className="mb-2 font-medium">Campus Environment:</p>
        {["Liberal Arts", "Research University", "Technical"].map((env) => (
          <label key={env} className="mr-4">
            <input
              type="checkbox"
              value={env}
              checked={formData.campusEnvironment.includes(env)}
              onChange={(e) => handleCheckboxChange(e, "campusEnvironment")}
            />
            <span className="ml-1">{env}</span>
          </label>
        ))}
      </div>

      <InputField
        label="University Size Preference"
        type="text"
        value={formData.universitySize}
        onChange={(e) =>
          setFormData({ ...formData, universitySize: e.target.value })
        }
      />

      <InputField
        label="Budget (Approx.)"
        type="text"
        value={formData.budget}
        onChange={(e) =>
          setFormData({ ...formData, budget: e.target.value })
        }
      />

      <div className="mb-5 flex items-center">
        <label className="font-bold mr-2">Financial Aid Needed?</label>
        <input
          type="checkbox"
          checked={formData.financialAid}
          onChange={handleToggleFinancialAid}
        />
      </div>
    </div>
  );
};

export default UniversityPreferencesStep;
