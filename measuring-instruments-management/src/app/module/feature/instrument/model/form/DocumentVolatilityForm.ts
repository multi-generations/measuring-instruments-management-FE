import {MeasuringInstrumentForm} from "./MeasuringInstrumentForm";
import {AttachedDocumentForm} from "./AttachedDocumentForm";

export interface DocumentVolatilityForm {
  id?: number;
  volatilityDate?: Date;
  // attachedDocument?: AttachedDocumentForm;
  attachedDocument?: string;
  volatilityPurpose?: string;
  quantity?: number;
  measuringInstrument?: MeasuringInstrumentForm;
}
