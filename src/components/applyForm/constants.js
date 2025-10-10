// constants.js
export const scholarshipOptions = [
  {
    value: "vees",
    label: "VEES - Vedubuild Educational Excellence Scholarship",
    fee: "₹399",
    target: "Class 5th-10th",
  },
  {
    value: "vstar",
    label: "V-STAR - Vedubuild Standard Test for Award & Rewards",
    fee:   "₹499",
    target: "12th/PUC",
  },
];

export const classOptions = {
  vees: ["5th", "6th", "7th", "8th", "9th", "10th"],
  vstar: ["12th/PUC - Arts", "12th/PUC - Commerce", "12th/PUC - Science"],
};

export const combinationOptions = {
  Arts: [
    "History, Economics, Political Science",
    "History, Economics, Sociology",
    "History, Psychology, Sociology",
    "Other Arts Combination",
  ],
  Commerce: [
    "Accountancy, Business Studies, Economics",
    "Accountancy, Business Studies, Computer Science",
    "Other Commerce Combination",
  ],
  Science: [
    "Physics, Chemistry, Mathematics",
    "Physics, Chemistry, Biology",
    "Physics, Chemistry, Computer Science",
    "Other Science Combination",
  ],
};

export const initialFormData = {
  studentName: "",
  mobileNo: "",
  emailId: "",
  studentClass: "",
  schoolCollege: "",
  aadharNo: "",
  address: "",
  city: "",
  State: "",
  pinCode: "",
  combination: "",
  scholarship: "",
  isPhoneVerified: true,
  isEmailVerified: true,
};

export const steps = [
  { number: 1, title: "Personal Information", icon: "User" },
  { number: 2, title: "Academic Details", icon: "GraduationCap" },
  { number: 3, title: "Program Selection", icon: "Award" },
  { number: 4, title: "Review & Submit", icon: "CheckCircle" },
];
