import {MeasuringInstrumentForm} from "./MeasuringInstrumentForm";

export interface AttachedDocumentForm {
  id?: number;
  documentName?: string;
  documentSymbol?: string;
  quantity?: number;
  documentNote?: string;
  measuringInstrument?: MeasuringInstrumentForm;
}
