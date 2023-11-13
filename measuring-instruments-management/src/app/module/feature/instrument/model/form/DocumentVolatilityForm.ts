import {AttachedDocumentDetailDto} from "./AttachedDocumentDetailDto";
import {MeasuringInstrumentDetailDto} from "./MeasuringInstrumentDetailDto";

export interface DocumentVolatilityForm {
  id?: number;
  volatilityDate?: Date;
  attachedDocument?: AttachedDocumentDetailDto;
  volatilityPurpose?: string;
  quantity?: number;
  measuringInstrument?: MeasuringInstrumentDetailDto;
}
