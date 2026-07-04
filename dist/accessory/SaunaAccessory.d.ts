import BaseAccessory from './BaseAccessory';
export default class SaunaAccessory extends BaseAccessory {
    requiredSchema(): string[][];
    configureServices(): void;
    mainService(): import("hap-nodejs").Service;
    configureCurrentState(): void;
    configureTargetState(): void;
    configureTargetTemp(): void;
    configureLight(): void;
}
//# sourceMappingURL=SaunaAccessory.d.ts.map