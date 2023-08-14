import {InstrumentGroup} from "./InstrumentGroup";
import {InstrumentType} from "./InstrumentType";

export interface MeasuringInstrumentListDto {
  id?: number;
  instrumentName?: string;
  instrumentPhoneticName?: string;
  instrumentGroup?: InstrumentGroup;
  instrumentType?: InstrumentType;
  instrumentSymbol?: string;
  instrumentSerialNumber?: string;
  managementLevel?: string;
  inServiceDate?: Date;
  managementUnit?: string;
  enabled?: boolean;
}
