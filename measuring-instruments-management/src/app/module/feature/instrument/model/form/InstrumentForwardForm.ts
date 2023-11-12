import {MeasuringInstrumentForm} from "./MeasuringInstrumentForm";

export interface InstrumentForwardForm {
  id?: number;
  createdTime?: Date;
  forwardDate?: Date;
  receiveUnit?: string;
  sender?: string;
  receiver?: string;
  issuingAuthority?: string;
  commandNumber?: string;
  instrumentForwardStatus?: string;
  forwardNote?: string;
  measuringInstrument?: MeasuringInstrumentForm;
}
