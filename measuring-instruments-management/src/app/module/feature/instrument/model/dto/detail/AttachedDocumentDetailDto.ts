export interface AttachedDocumentDetailDto {
  id: number;
  documentName: string;
  documentSymbol: string;
  quantity: number;
  documentNote: string;
  measuringInstrumentId?: number;
}
