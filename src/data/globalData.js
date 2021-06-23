
export const global = {
  loading: false,
  data: {
    orgTypes: ["Business", "Academic"],
    orgTypeDefault: "Business",

    orgSizes: [
      "Micro SME",
      "Small Company",
      "Medium Company",
      "Large Company",
      "Academic",
    ],
    orgSizeDefault: "Micro SME",
  
    natures: ["Platform", "Process", "Product"],
    natureDefault: "Platform",
  
    ipProtections: [
      "Copyright",
      "Patents",
      "Trade Secrets",
      "Patents and Copyright",
      "Copyright and Trade Secrets",
      "Patents and Trade Secrets",
    ],
    ipProtectionDefault: "Patents and Copyright",

    projectRoles: [
      "Project Manager",
      "Technical Lead",
      "Senior Software Developer",
      "Software Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "AI and ML Lead",
      "Data Architect",
      "Data Scientist",
      "Business Development and Market Engagement",
      "User Experience",
      "Mechanical Engineer",
      "Materials Engineer",
      "Hardware Developer",
      "Industrial Design",
      "Electronics Engineer",
    ],
    projectRoleDefault: null,
  
    locations: ["UK", "Other"],
    locationDefault: "UK",
  
    fundingLevelMin: 0,
    fundingLevelMax: 100,
    fundingLevelInc: 5,
    fundingLevelDefault: 70,

    overheadRateMin: 0,
    overheadRateMax: 100,
    overheadRateInc: 10,
    overheadRateDefault: 20,

    businessWarn: 70,
    academicWarn: 30,

    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
    utilisations: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  error: "",
};
