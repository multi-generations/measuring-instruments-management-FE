import {MeasuringInstrumentForm} from "../../form/MeasuringInstrumentForm";
import {AttachedDocumentForm} from "../../form/AttachedDocumentForm";

export interface DocumentVolatilityDetailDto {
  id: number;
  volatilityDate: Date;
  attachedDocument: AttachedDocumentForm;
  volatilityPurpose: string;
  quantity: number;
  measuringInstrument: MeasuringInstrumentForm;
}
