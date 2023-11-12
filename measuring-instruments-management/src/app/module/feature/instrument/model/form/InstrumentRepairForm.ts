import { MeasuringInstrumentForm } from './MeasuringInstrumentForm';

export interface InstrumentRepairForm {
  id?: number;
  createdTime?: Date;
  repairDate?: Date;
  instrumentCondition?: string;
  repairReason?: string;
  repairResult?: string;
  repairPlace?: string;
  repairer?: string;
  repairNote?: string;
  measuringInstrument: MeasuringInstrumentForm;
}
