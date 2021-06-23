
export const options = {
  loading: false,
  data: {
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
    fundingLevelMin: 0,
    fundingLevelMax: 100,
    fundingLevelInc: 5,
    fundingLevels: [
      0,
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100,
    ],
    fundingLevelDefault: 70,
    overheadRateMin: 0,
    overheadRateMax: 100,
    overheadRateInc: 10,
    overheadRates: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    overheadRateDefault: 20,
    matchFundingSources: ["Investor", "Company Funds"],
    matchFundingSourceDefault: "Investor",
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
    // markets: ["UK", "EU", "US", "Asia"],
    // marketDefault: "UK",
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
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
    utilisations: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

    maxProjectLength: 36,

    maxWorkPackages: 10,
    maxDeadlines: 10,
    maxTasksPerPackage: 10,
    maxTeamMembers: 10,
    maxSubcontract: 5,
    // maxOverhead: 10,

    maxMaterials: 10,
    maxTravel: 10,
    maxCapex: 10,
    maxOther: 5,

    maxMarkets: 3,
    maxStreams: 4,

    amberSalary: 50000,
    redSalary: 70000,
    amberDayRate: 300,
    redDayRate: 450,
    amberOverUtil: 55,
    redOverUtil: 59,

    materialWarn: 25,
    materialOver: 40,
    travelWarn: 25,
    travelOver: 40,
    // subcontractWarn: 25,
    // subcontractOver: 40,
    capexWarn: 25,
    capexOver: 40,
    otherWarn: 25,
    otherOver: 40,
    percentWarn: 25,
    percentOver: 40,

    marketOptions: ["US Market", "Asia Market"],
  },
  error: "",
};
