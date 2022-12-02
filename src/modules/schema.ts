export const template = [
  "/Transfer/ABR",
  {
    abn: {
      status: "ABN/@status",
      statusFromDate: "ABN/@ABNStatusFromDate",
      value: "ABN",
    },
    entityType: {
      entityTypeInd: "EntityType/EntityTypeInd",
      entityTypeText: "EntityType/EntityTypeText",
    },
    mainEntity: {
      nonIndividualName: {
        type: "MainEntity/NonIndividualName/@type",
        value: "MainEntity/NonIndividualName/NonIndividualNameText",
      },
      businessAddress: {
        state: "MainEntity/BusinessAddress/AddressDetails/State",
        postcode: "MainEntity/BusinessAddress/AddressDetails/Postcode",
      },
    },
    legalEntity: {
      individualName: {
        type: "LegalEntity/IndividualName/@type",
        givenName: ["LegalEntity/IndividualName/GivenName"],
        familyName: "LegalEntity/IndividualName/FamilyName",
        nameTitle: "LegalEntity/IndividualName/NameTitle",
      },
      businessAddress: {
        state: "LegalEntity/BusinessAddress/AddressDetails/State",
        postcode: "LegalEntity/BusinessAddress/AddressDetails/Postcode",
      },
    },
    asicNumber: {
      type: "ASICNumber/@ASICNumberType",
      value: "ASICNumber",
    },
    gst: {
      status: "GST/@status",
      statusFromDate: "GST/@GSTStatusFromDate",
    },
    dgr: {
      status: "DGR/@status",
      statusFromDate: "DGR/@DGRStatusFromDate",
      nonIndividualName: {
        type: "MainEntity/NonIndividualName/@type",
        value: "MainEntity/NonIndividualName/NonIndividualNameText",
      },
    },
    otherEntity: [
      "OtherEntity",
      {
        nonIndividualName: {
          type: "OtherEntity/NonIndividualName/@type",
          value: "OtherEntity/NonIndividualName/NonIndividualNameText",
        },
      },
    ],
    recordLastUpdatedDate: "@recordLastUpdatedDate",
    replaced: "@replaced",
  },
];

const example = {
  abn: { status: "CAN", statusFromDate: "20141218", value: "11000017596" },
  entityType: {
    entityTypeInd: "PRV",
    entityTypeText: "Australian Private Company",
  },
  mainEntity: {
    nonIndividualName: { type: "MN", value: "BJELKE-PETERSEN BROS PTY LTD" },
    businessAddress: { state: "NSW", postcode: "2114" },
  },
  legalEntity: {
    individualName: { type: "", givenName: [], familyName: "", nameTitle: "" },
    businessAddress: { state: "", postcode: "" },
  },
  asicNumber: { type: "undetermined", value: "000017596" },
  gst: { status: "CAN", statusFromDate: "20120101" },
  dgr: {
    status: "",
    statusFromDate: "",
    nonIndividualName: { type: "MN", value: "BJELKE-PETERSEN BROS PTY LTD" },
  },
  otherEntity: [],
  recordLastUpdatedDate: "20161207",
  replaced: "N",
};
