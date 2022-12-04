import * as mongoose from "mongoose";
import deepFreeze from "../utils/deepFreeze";
import {
  EntityTypeInd,
  MainOrLegal,
  NameType,
  StateEnum,
  StatusType,
} from "./schema";

export const HttpResponses = deepFreeze({
  ok: {
    statusCode: 200,
    message: "200 OK",
  },
  created: {
    statusCode: 201,
    message: "201 Created",
  },
  noContent: {
    statusCode: 204,
    message: "204 No Content",
  },
  badRequest: {
    statusCode: 400,
    message: "400 Bad Request",
  },
  unauthorized: {
    statusCode: 401,
    message: "401 Unauthorized",
  },
  forbidden: {
    statusCode: 403,
    message: "403 Forbidden",
  },
  notFound: {
    statusCode: 404,
    message: "404 Not Found",
  },
  internalServerError: {
    statusCode: 500,
    message: "500 Internal Server Error",
  },
});

const mongoSchema = mongoose.Schema;

const abrSchema = new mongoSchema({
  abn: {
    status: {
      type: String,
      enum: StatusType,
    },
    statusFromDate: Date,
    value: String,
  },
  entityType: {
    entityTypeInd: {
      type: String,
      enum: EntityTypeInd,
    },
    entityTypeText: String,
  },
  entity: {
    entityCategory: {
      type: String,
      enum: MainOrLegal,
    },
    entityName: {
      nameType: {
        type: String,
        enum: NameType,
      },
      nonIndividualName: String,
      givenName: [String],
      familyName: String,
      nameTitle: String,
    },
    businessAddress: {
      state: {
        type: String,
        enum: StateEnum,
      },
      postcode: String,
    },
  },
  asicNumber: {
    asicNumberType: String,
    value: String,
  },
  gst: {
    status: String,
    statusFromDate: Date,
  },
  dgr: {
    status: String,
    statusFromDate: Date,
    nonIndividualName: {
      nameType: {
        type: String,
        enum: NameType,
      },
      value: String,
    },
  },
  otherEntity: [
    {
      nameType: {
        type: String,
        enum: NameType,
      },
      value: String,
    },
  ],
  recordLastUpdatedDate: Date,
});

export const ABRModel = mongoose.model("ABR", abrSchema);
