// steps/AcademicInformationStep.tsx
import React from "react";
import { School } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface AcademicInformationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AcademicInformationStep: React.FC<AcademicInformationStepProps> = ({
                                                                           formData,
                                                                           setFormData,
                                                                         }) => {
  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <School size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>Academic Information</h2>
      </div>

      <div className={styles.twoColumnGrid}>
        <InputField
          label="Current School"
          type="text"
          value={formData.currentSchool}
          onChange={(e) =>
            setFormData({ ...formData, currentSchool: e.target.value })
          }
        />
        <InputField
          label="Graduation Year"
          type="text"
          value={formData.graduationYear}
          onChange={(e) =>
            setFormData({ ...formData, graduationYear: e.target.value })
          }
        />
      </div>

      <div className={styles.twoColumnGrid}>
        <InputField
          label="GPA (Unweighted)"
          type="text"
          value={formData.gpa}
          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
        />
        <InputField
          label="GPA (Weighted)"
          type="text"
          value={formData.weightedGpa}
          onChange={(e) =>
            setFormData({ ...formData, weightedGpa: e.target.value })
          }
        />
      </div>

      <div className={styles.twoColumnGrid}>
        <InputField
          label="Class Rank"
          type="text"
          value={formData.classRank}
          onChange={(e) =>
            setFormData({ ...formData, classRank: e.target.value })
          }
        />
        <InputField
          label="SAT Score"
          type="text"
          value={formData.satScore}
          onChange={(e) => setFormData({ ...formData, satScore: e.target.value })}
        />
      </div>

      <div className={styles.twoColumnGrid}>
        <InputField
          label="ACT Score"
          type="text"
          value={formData.actScore}
          onChange={(e) => setFormData({ ...formData, actScore: e.target.value })}
        />
        <InputField
          label="AP Tests (Scores)"
          type="text"
          value={formData.apTests}
          onChange={(e) =>
            setFormData({ ...formData, apTests: e.target.value })
          }
        />
      </div>

      <InputField
        label="IB Tests (Scores)"
        type="text"
        value={formData.ibTests}
        onChange={(e) =>
          setFormData({ ...formData, ibTests: e.target.value })
        }
      />
    </div>
  );
};

export default AcademicInformationStep;
