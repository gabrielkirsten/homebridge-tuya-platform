import BaseAccessory from './BaseAccessory';
export default class CarbonDioxideSensorAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCarbonDioxideDetected(): void;
    configureCarbonDioxideLevel(): void;
}
//# sourceMappingURL=CarbonDioxideSensorAccessory.d.ts.map