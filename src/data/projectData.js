export const projectData = {
  loading: false,
  data: {
    details: {
      productPlatformName: "productPlatformName",
      applicationNumber: "123445",
      nature: "Process",
      ipProtection: "protection",
      projectName: "first Project",
      projectLength: 20,
      startMonth: "Feb",
      startYear: "2021",
      projectManager: "projectManager",
      software: "software",
      matchFunding: "funding",
      ganttRef: "ganttRef",
      competitor: "competitor",
      // dates: [], // array of sequential months
    },
    lead: {
      companyName: "lead company",
      companyAcronym: "acronym",
      organisationType: "type",
      organisationSize: "size",
      postcode: "postcode",
      turnover: 20000,
      lastFinancialMonth: "",
      lastFinancialYear: "year",
      lawyer: "lawyer",
      bankHolidays: 3,
      annualLeave: 30,
      numEmployees: 10,
      partnerFunding: "",
      fundingLevel: 10,
      matchFundingSource: "source",
      investorName: "name",
    },
    pOne: {
      companyName: "",
      companyAcronym: "",
      organisationType: "",
      organisationSize: "",
      postcode: "",
      turnover: "",
      lastFinancialMonth: "",
      lastFinancialYear: "",
      lawyer: "",
      bankHolidays: "",
      annualLeave: "",
      numEmployees: "",
      partnerFunding: "",
      fundingLevel: "",
      matchFundingSource: "",
      investorName: "",
    },
    pTwo: {
      companyName: "pTwo company",
      companyAcronym: "acronym",
      organisationType: "type",
      organisationSize: "size",
      postcode: "postcode",
      turnover: 20000,
      lastFinancialMonth: "",
      lastFinancialYear: "year",
      lawyer: "lawyer",
      bankHolidays: 3,
      annualLeave: 30,
      numEmployees: 10,
      partnerFunding: "partner",
      fundingLevel: 10,
      matchFundingSource: "source",
      investorName: "name",
    },
  },
  error: "",
};

// const month = "Feb";
// const year = 2021;

// const projectStart = moment(`${month} ${year}`, "MMM YYYY");
// const dateArray = () => {
//   const years = [];
//   const dateStart = projectStart;
//   for (let i = 0; i < projectData.data.projectLength; i++) {
//     years.push(dateStart.format("MMM YYYY"));
//     dateStart.add(1, "month");
//   }
//   return years;
// };

// const dateList = dateArray();
// projectData.data.dates = dateList;
