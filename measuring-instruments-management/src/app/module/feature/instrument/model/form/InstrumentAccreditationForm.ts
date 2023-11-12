import { MeasuringInstrumentForm } from './MeasuringInstrumentForm';

export interface InstrumentAccreditationForm {
  id?: number;
  accreditationDate?: Date;
  validAccreditationEndDate?: Date;
  accreditationPlace?: string;
  accreditationResult?: string;
  accreditationConfirmNumber?: string;
  accreditor?: string;
  accreditationNote?: string;
  measuringInstrument?: MeasuringInstrumentForm;
}
