import {MeasuringUnit} from "./MeasuringUnit";

export interface AccreditationCenter {
  id?: number;
  accreditationCenterName?: string;
  recognitionDate?: Date | null;
  measuringUnit?: MeasuringUnit | null;
  testInstrumentName?: string | null;
  measuringParameter?: string | null;
  standardSymbol?: string | null;
  standardProcess?: string | null;
}
