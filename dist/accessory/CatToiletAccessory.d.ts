import BaseAccessory from './BaseAccessory';
export default class CatToiletAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureSwitch(schemaCodes: string[], name: string): void;
    configureLight(): void;
    configureOccupancySensor(): void;
    configureFilterMaintenance(): void;
    configureFault(): void;
}
//# sourceMappingURL=CatToiletAccessory.d.ts.map