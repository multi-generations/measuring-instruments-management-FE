import {InstrumentGroup} from "../entity/InstrumentGroup";
import {ManagementUnit} from "../entity/ManagementUnit";
import {AccreditationCenter} from "../entity/AccreditationCenter";
import {InstrumentStatus} from "../entity/InstrumentStatus";

export interface MeasuringInstrumentForm {
  instrumentGroup?: InstrumentGroup;
  instrumentName?: string;
  instrumentSymbol?: string;
  instrumentSerialNumber?: string;
  managementLevel?: string;
  manufactureCountry?: string;
  manufactureYear?: number;
  inServiceDate?: Date;
  managementUnit?: ManagementUnit;
  weaponGuarantee?: string;
  accreditationCycle?: number;
  accreditationCenter?: AccreditationCenter;
  qualityLevel?: number;
  instrumentStatus?: InstrumentStatus;
  detailedDescription?: string;
}
