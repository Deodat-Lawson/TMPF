// steps/ExtracurricularActivitiesStep.tsx
import React from "react";
import { Award } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface ExtracurricularActivitiesStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ExtracurricularActivitiesStep: React.FC<ExtracurricularActivitiesStepProps> = ({
                                                                                       formData,
                                                                                       setFormData,
                                                                                     }) => {
  const addActivity = () => {
    setFormData({
      ...formData,
      extracurriculars: [
        ...formData.extracurriculars,
        {
          activity: "",
          role: "",
          yearsInvolved: "",
          description: "",
        },
      ],
    });
  };

  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <Award size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>Extracurricular Activities</h2>
      </div>

      {formData.extracurriculars.map((ec, index) => (
        <div key={index} className="mb-8">
          <h4 className="font-semibold text-lg mb-2">Activity {index + 1}</h4>
          <InputField
            label="Activity"
            type="text"
            value={ec.activity}
            onChange={(e) => {
              const updated = [...formData.extracurriculars];
              updated[index]!.activity = e.target.value;
              setFormData({ ...formData, extracurriculars: updated });
            }}
          />
          <InputField
            label="Role"
            type="text"
            value={ec.role}
            onChange={(e) => {
              const updated = [...formData.extracurriculars];
              updated[index]!.role = e.target.value;
              setFormData({ ...formData, extracurriculars: updated });
            }}
          />
          <InputField
            label="Years Involved"
            type="text"
            value={ec.yearsInvolved}
            onChange={(e) => {
              const updated = [...formData.extracurriculars];
              updated[index]!.yearsInvolved = e.target.value;
              setFormData({ ...formData, extracurriculars: updated });
            }}
          />
          <InputField
            label="Description"
            type="text"
            value={ec.description}
            onChange={(e) => {
              const updated = [...formData.extracurriculars];
              updated[index]!.description = e.target.value;
              setFormData({ ...formData, extracurriculars: updated });
            }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addActivity}
        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
      >
        Add Another Activity
      </button>
    </div>
  );
};

export default ExtracurricularActivitiesStep;
