// steps/AcademicInterestsStep.tsx

import React from "react";
import { Book } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface AcademicInterestsStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AcademicInterestsStep: React.FC<AcademicInterestsStepProps> = ({
                                                                       formData,
                                                                       setFormData,
                                                                     }) => {
  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <Book size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>Academic Interests</h2>
      </div>

      <InputField
        label="Intended Major"
        type="text"
        value={formData.intendedMajor}
        onChange={(e) =>
          setFormData({ ...formData, intendedMajor: e.target.value })
        }
      />

      <InputField
        label="Academic Interests (comma-separated)"
        type="text"
        value={formData.academicInterests.join(", ")}
        onChange={(e) => {
          const interests = e.target.value
            .split(",")
            .map((i) => i.trim());
          setFormData({ ...formData, academicInterests: interests });
        }}
      />

      <InputField
        label="Career Goals"
        type="text"
        value={formData.careerGoals}
        onChange={(e) =>
          setFormData({ ...formData, careerGoals: e.target.value })
        }
      />
    </div>
  );
};

export default AcademicInterestsStep;
