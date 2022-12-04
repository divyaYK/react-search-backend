import { ABRModel } from "../modules/model";
import { IAbr } from "../modules/types";

export default class ABRService {
  public createRecord(abrParams: IAbr, callback: any) {
    const _session = new ABRModel(abrParams);
    _session.save(callback);
  }
}
