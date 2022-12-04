import { ABRModel } from "../modules/model";
import { IAbr, IGetParams } from "../modules/types";

export default class ABRService {
  public createRecord(abrParams: IAbr, callback: any) {
    const _session = new ABRModel(abrParams);
    _session.save(callback);
  }

  public getAllRecords(getParams: IGetParams, callback: any) {
    console.log(getParams);
    if (getParams.query !== undefined) {
      ABRModel.find(getParams.query)
        .limit(getParams.limit)
        .skip(getParams.page * getParams.limit)
        .exec(callback);
    } else {
      ABRModel.find()
        .limit(getParams.limit)
        .skip(getParams.page * getParams.limit)
        .exec(callback);
    }
  }
}
