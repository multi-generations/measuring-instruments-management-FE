import {InstrumentType} from "../entity/InstrumentType";
import {TechnicalType} from "../entity/TechnicalType";
import {MeasuringUnit} from "../entity/MeasuringUnit";
import {MeasuringInstrumentForm} from "./MeasuringInstrumentForm";

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
  measuringInstrument?: MeasuringInstrumentForm;
}
