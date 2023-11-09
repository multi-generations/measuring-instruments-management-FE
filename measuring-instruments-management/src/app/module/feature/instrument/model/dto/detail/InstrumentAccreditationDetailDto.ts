export interface InstrumentAccreditationDetailDto {
  id: number;
  accreditationDate: Date;
  accreditationPlace: string;
  accreditor: string;
  accreditationResult: string;
  accreditationConfirmNumber: string;
  validAccreditationEndDate: Date;
  accreditationNote: string;
}
