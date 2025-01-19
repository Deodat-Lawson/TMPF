// types.ts

export interface ExtracurricularActivity {
  activity: string;
  role: string;
  yearsInvolved: string;
  description: string;
}

export interface Essays {
  personalStatement: string;
  supplementalEssay: string;
}

export interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  citizenship: string;

  // Academic Information
  currentSchool: string;
  graduationYear: string;
  gpa: string;
  weightedGpa: string;
  classRank: string;
  satScore: string;
  actScore: string;
  apTests: string;
  ibTests: string;

  // Academic Interests
  intendedMajor: string;
  academicInterests: string[];
  careerGoals: string;

  // Extracurricular Activities
  extracurriculars: ExtracurricularActivity[];

  // University Preferences
  locationPreference: string[];
  campusEnvironment: string[];
  universitySize: string;
  budget: string;
  financialAid: boolean;

  // Additional Information
  honors: string[];
  essays: Essays;
}
