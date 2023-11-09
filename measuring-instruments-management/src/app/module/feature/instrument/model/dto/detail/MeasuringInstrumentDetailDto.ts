import {InstrumentGroup} from "../../entity/InstrumentGroup";
import {ManagementUnit} from "../../entity/ManagementUnit";
import {InstrumentStatus} from "../../entity/InstrumentStatus";

export interface MeasuringInstrumentDetailDto {
  id: number;
  instrumentGroup: InstrumentGroup;
  instrumentName: string;
  instrumentSymbol: string;
  instrumentSerialNumber: string;
  managementLevel: string;
  manufactureCountry: string;
  manufactureYear: number;
  inServiceDate: Date;
  managementUnit: ManagementUnit;
  weaponGuarantee: string;
  accreditationCycle: number;
  qualityLevel: number;
  instrumentStatus: InstrumentStatus;
  detailedDescription: string;
}
