export interface InstrumentUsageDetailDto {
  id: number;
  monitorDate: Date;
  instrumentStatus: string;
  workingDuration: number;
  instrumentUser: string;
  usageNote: string;
}
