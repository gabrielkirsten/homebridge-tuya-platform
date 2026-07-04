import BaseAccessory from './BaseAccessory';
export default class HeaterAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCurrentState(): void;
    configureTargetState(): void;
    configureHeatingThreshouldTemp(): void;
}
//# sourceMappingURL=HeaterAccessory.d.ts.map