import {
  EntityTypeInd,
  MainOrLegal,
  NameType,
  StateEnum,
  StatusType,
} from "./schema";

export interface IAbr {
  abn: {
    status: StatusType;
    statusFromDate: Date;
    value: string;
  };
  entityType: {
    entityTypeInd: EntityTypeInd;
    entityTypeText: string;
  };
  entity: {
    entityCategory: MainOrLegal;
    entityName: {
      nameType?: NameType;
      nonIndividualName?: string;
      givenName?: string[];
      familyName?: string;
      nameTitle?: string;
    };
    businessAddress: {
      state: StateEnum;
      postcode: string;
    };
  };
  asicNumber: {
    asicNumberType: string;
    value: string;
  };
  gst?: {
    status: string;
    statusFromDate: Date;
  };
  dgr?: {
    status?: string;
    statusFromDate?: Date;
    nonIndividualName?: {
      nameType: NameType;
      value: string;
    };
  };
  otherEntity: [
    {
      nameType: {
        type: string;
        enum: NameType;
      };
      value: string;
    }
  ];
  recordLastUpdatedDate: Date;
}
