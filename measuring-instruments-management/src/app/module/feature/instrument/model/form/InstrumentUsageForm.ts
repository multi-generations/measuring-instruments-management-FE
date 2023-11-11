import { InstrumentType } from '../entity/InstrumentType';
import { TechnicalType } from '../entity/TechnicalType';
import { MeasuringUnit } from '../entity/MeasuringUnit';
import { MeasuringInstrumentForm } from './MeasuringInstrumentForm';

export interface InstrumentUsageForm {
  id?: number;
  monitorDate?: Date;
  workingDuration: number;
  instrumentUser: string;
  instrumentStatus: string;
  usageNote: string;
  measuringInstrument: MeasuringInstrumentForm;
}
