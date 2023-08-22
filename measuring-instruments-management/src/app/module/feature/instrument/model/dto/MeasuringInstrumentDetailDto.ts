export interface MeasuringInstrumentDetailDto {
  id: number;
  instrumentName: string;
  instrumentPhoneticName: string;
  instrumentGroupName: string;
  instrumentSymbol: string;
  instrumentSerialNumber: string;
  managementLevel: string;
  managementUnit: string;
  inServiceDate: Date;
  manufactureCountry: string;
  manufactureYear: number;
  weaponGuarantee: string;
  accreditationCycle: number;
  qualityLevel: number;
  instrumentStatusName: string;
  instrumentTypeName: string;
  detailedDescription: string;
}
