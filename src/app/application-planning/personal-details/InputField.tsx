// InputField.tsx

import React from "react";
import styles from "~/styles/ApplicationPlanning/UniversityApplicationForm.module.css";

interface InputFieldProps {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className={styles.inputField}>
      {label && <label className={styles.inputFieldLabel}>{label}</label>}
      {type === "text" ||
      type === "email" ||
      type === "tel" ||
      type === "date" ? (
        <input
          className={styles.inputFieldInput}
          type={type}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={styles.inputFieldInput}
          value={value}
          onChange={onChange}
          rows={3}
        />
      )}
    </div>
  );
};

export default InputField;
