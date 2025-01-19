import React from "react";
import { GraduationCap } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface AdditionalInformationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AdditionalInformationStep: React.FC<AdditionalInformationStepProps> = ({
                                                                               formData,
                                                                               setFormData,
                                                                             }) => {
  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <GraduationCap size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>Additional Information</h2>
      </div>

      <div className="mb-5">
        <p className="mb-2">Honors/Awards (comma-separated):</p>
        <InputField
          label=""
          type="text"
          value={formData.honors.join(", ")}
          onChange={(e) => {
            const newHonors = e.target.value.split(",").map((h) => h.trim());
            setFormData({ ...formData, honors: newHonors });
          }}
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.inputFieldLabel}>Personal Statement</label>
        <textarea
          className={styles.inputFieldInput}
          rows={4}
          value={formData.essays.personalStatement}
          onChange={(e) =>
            setFormData({
              ...formData,
              essays: {
                ...formData.essays,
                personalStatement: e.target.value,
              },
            })
          }
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.inputFieldLabel}>Supplemental Essay</label>
        <textarea
          className={styles.inputFieldInput}
          rows={4}
          value={formData.essays.supplementalEssay}
          onChange={(e) =>
            setFormData({
              ...formData,
              essays: {
                ...formData.essays,
                supplementalEssay: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default AdditionalInformationStep;
