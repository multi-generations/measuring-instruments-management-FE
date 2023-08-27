export interface TechnicalCharacteristicDetailDto {
  id: number;
  basicCharacteristic: string;
  requiredCharacteristic: string;
  measuringRange: number;
  measuringError: number;
  measuringUncertainlyDegree: number;
  measuringUnitName: string;
}
