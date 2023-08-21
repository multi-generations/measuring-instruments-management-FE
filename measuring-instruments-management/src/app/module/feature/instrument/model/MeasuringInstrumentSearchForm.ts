import {InstrumentGroup} from "./InstrumentGroup";
import {InstrumentType} from "./InstrumentType";
import {InstrumentStatus} from "./InstrumentStatus";

export interface MeasuringInstrumentSearchForm {
  multipleSearch: string;
  instrumentGroupId: string;
  instrumentTypeId: string;
  instrumentStatusId: string;
  startInServiceDate: Date;
  endInServiceDate: Date
}
