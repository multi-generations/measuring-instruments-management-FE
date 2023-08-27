import {InstrumentGroup} from "../entity/InstrumentGroup";
import {InstrumentType} from "../entity/InstrumentType";
import {InstrumentStatus} from "../entity/InstrumentStatus";

export interface MeasuringInstrumentListDto {
  id: number;
  instrumentName?: string;
  instrumentPhoneticName?: string;
  instrumentGroup?: InstrumentGroup;
  instrumentType?: InstrumentType;
  instrumentSymbol?: string;
  instrumentSerialNumber?: string;
  managementLevel?: string;
  inServiceDate?: Date;
  managementUnit?: string;
  instrumentStatus?: InstrumentStatus;
  enabled?: boolean;
}
