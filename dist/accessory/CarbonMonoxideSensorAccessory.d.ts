import BaseAccessory from './BaseAccessory';
export default class CarbonMonoxideSensorAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCarbonMonoxideDetected(): void;
    configureCarbonMonoxideLevel(): void;
}
//# sourceMappingURL=CarbonMonoxideSensorAccessory.d.ts.map