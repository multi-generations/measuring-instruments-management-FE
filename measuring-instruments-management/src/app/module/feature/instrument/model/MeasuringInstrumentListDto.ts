import {InstrumentGroup} from "./InstrumentGroup";
import {InstrumentType} from "./InstrumentType";
import {InstrumentStatus} from "./InstrumentStatus";

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
