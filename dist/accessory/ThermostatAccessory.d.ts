import BaseAccessory from './BaseAccessory';
export default class ThermostatAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCurrentState(): void;
    configureTargetState(): void;
    configureTargetTemp(): void;
}
//# sourceMappingURL=ThermostatAccessory.d.ts.map