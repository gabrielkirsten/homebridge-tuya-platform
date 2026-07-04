import BaseAccessory from './BaseAccessory';
export default class AirConditionerAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    configureAirConditioner(): void;
    configureDehumidifier(): void;
    configureFan(): void;
    mainService(): import("hap-nodejs").Service;
    dehumidifierService(): import("hap-nodejs").Service;
    fanService(): import("hap-nodejs").Service;
    configureCurrentState(): void;
    configureTargetState(): void;
    configureCoolingThreshouldTemp(): void;
    configureHeatingThreshouldTemp(): void;
}
//# sourceMappingURL=AirConditionerAccessory.d.ts.map