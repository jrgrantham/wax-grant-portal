export const options = {
  loading: false,
  data: {
    partners: 3,
    lead: "james@xyz.com",
    pOne: "damien@xyz.com",
    pTwo: "casper@xyz.com",

    maxProjectLength: 36,
    maxWorkPackages: 10,
    maxDeadlines: 10,
    maxTasksPerPackage: 10,

    maxTeamMembers: 10,
    maxSubcontract: 5,
    maxMaterials: 10,
    maxTravel: 10,
    maxCapex: 10,
    maxOther: 5,

    marketOptions: ["US Market", "Asia Market"],

    materialWarn: 25,
    materialOver: 40,
    travelWarn: 25,
    travelOver: 40,
    subcontractWarn: 25,
    subcontractOver: 40,
    capexWarn: 25,
    capexOver: 40,
    otherWarn: 25,
    otherOver: 40,
    percentWarn: 25,
    percentOver: 40,

    amberSalary: 70000,
    redSalary: 90000,
    amberDayRate: 700,
    redDayRate: 1200,
    // amberOverUtil: 55,
    // redOverUtil: 59,

    maxMarkets: 3,
    maxStreams: 4,
  },
  error: "",
};
