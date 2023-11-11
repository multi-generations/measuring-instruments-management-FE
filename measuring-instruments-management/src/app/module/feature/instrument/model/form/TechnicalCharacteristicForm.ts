import {InstrumentType} from "../entity/InstrumentType";
import {TechnicalType} from "../entity/TechnicalType";
import {MeasuringUnit} from "../entity/MeasuringUnit";

export interface TechnicalCharacteristicForm {
  id?: number;
  instrumentType?: InstrumentType;
  technicalType?: TechnicalType;
  measuringRangeStart?: number;
  measuringUnitStart?: MeasuringUnit;
  measuringRangeEnd?: number;
  measuringUnitEnd?: MeasuringUnit;
  measuringError?: number;
  measuringErrorUnit?: MeasuringUnit;
  measuringInstrumentId?: number;
}
