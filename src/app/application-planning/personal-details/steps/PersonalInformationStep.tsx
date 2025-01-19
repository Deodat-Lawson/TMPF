// steps/PersonalInformationStep.tsx

import React from "react";
import { User } from "lucide-react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";
import { FormData } from "../types";
import InputField from "../InputField";

interface PersonalInformationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({
                                                                           formData,
                                                                           setFormData,
                                                                         }) => {
  return (
    <div className={styles.fadeIn}>
      <div className={styles.sectionTitle}>
        <User size={24} color="#2563eb" />
        <h2 className={styles.sectionTitleH2}>Personal Information</h2>
      </div>

      <div className={styles.twoColumnGrid}>
        <InputField
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <InputField
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </div>

      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <div className={styles.twoColumnGrid}>
        <InputField
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        <InputField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData({ ...formData, dateOfBirth: e.target.value })
          }
        />
      </div>

      <InputField
        label="Citizenship"
        type="text"
        value={formData.citizenship}
        onChange={(e) =>
          setFormData({ ...formData, citizenship: e.target.value })
        }
      />
    </div>
  );
};

export default PersonalInformationStep;
