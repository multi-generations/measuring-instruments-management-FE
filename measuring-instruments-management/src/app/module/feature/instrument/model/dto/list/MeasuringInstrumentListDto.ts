import {InstrumentGroup} from "../../entity/InstrumentGroup";
import {InstrumentStatus} from "../../entity/InstrumentStatus";
import {ManagementUnit} from "../../entity/ManagementUnit";

export interface MeasuringInstrumentListDto {
  id: number;
  instrumentName?: string;
  instrumentGroup?: InstrumentGroup;
  instrumentSymbol?: string;
  instrumentSerialNumber?: string;
  managementLevel?: string;
  inServiceDate?: Date;
  managementUnit?: ManagementUnit;
  instrumentStatus?: InstrumentStatus;
  enabled?: boolean;
}
